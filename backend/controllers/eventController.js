import Event from '../models/Event.js';
import EventBooking from '../models/EventBooking.js';
import cloudinary from '../config/cloudinary.js';
import { getPublicIdFromUrl, uploadBufferToCloudinary } from "../utils/mediaUtils.js";
import pagination from '../utils/pagination.js';
// Create a new event
export const createEvent = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Event image is required"
            });
        }

        // Upload image to Cloudinary
        const imageResult = await uploadBufferToCloudinary(
            req.file.buffer,
            "events/images"
        );

        const event = await Event.create({
            ...req.body,
            categories: JSON.parse(req.body.categories),
            posterImage: imageResult.secure_url
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//update an event
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        let updateData = { ...req.body };

        // Parse categories if present
        if (req.body.categories) {
            updateData.categories = JSON.parse(req.body.categories);
        }

        // If new image uploaded
        if (req.file) {
            const imageResult = await uploadBufferToCloudinary(
                req.file.buffer,
                "events/images"
            );

            updateData.posterImage = imageResult.secure_url;

            // Delete old image safely
            if (event.posterImage) {
                try {
                    const publicId = getPublicIdFromUrl(event.posterImage);
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.error("Cloudinary delete failed:", err.message);
                }
            }
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get all events
export const getAllEvents = async (req, res) => {
    try {
        const { city, eventType } = req.query;
        const { page, limit, skip } = pagination(req);

        const filter = {};
        if (city) filter.city = city;
        if (eventType) filter.eventType = eventType;

        const events = await Event.find(filter).sort({ date: 1 }).skip(skip).limit(limit);

        const total = await Event.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            success: true,
            events,
            total,
            totalPages,
            limit,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get a single event by ID
export const getSingleEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Book an event
export const bookEvent = async (req, res) => {
    try {
        const { eventId, category, numberOfSeats } = req.body;
        const userId = req.user._id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        const selectedCategory = event.categories.find(
            (cat) => cat.name === category
        );

        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        if (selectedCategory.availableSeats < numberOfSeats) {
            return res.status(400).json({
                success: false,
                message: "Not enough seats available"
            });
        }

        // Calculate total amount
        const totalAmount = selectedCategory.price * numberOfSeats;

        // Deduct seats
        selectedCategory.availableSeats -= numberOfSeats;

        // Increase booking count
        event.bookingsCount += numberOfSeats;

        await event.save();

        const booking = await EventBooking.create({
            user: userId,
            event: eventId,
            category,
            numberOfSeats,
            totalAmount,
            paymentStatus: "paid" // change after Razorpay integration
        });

        res.status(201).json({
            success: true,
            message: "Event booked successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//cancel booking
export const cancelEventBooking = async (req, res) => {
    try {
        const booking = await EventBooking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (booking.ticketStatus === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Already cancelled"
            });
        }

        const event = await Event.findById(booking.event);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        const category = event.categories.find(
            (cat) => cat.name === booking.category
        );

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }

        // Restore seats
        category.availableSeats += booking.numberOfSeats;
        event.bookingsCount -= booking.numberOfSeats;

        booking.ticketStatus = "cancelled";

        await event.save();
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully"
        });

    } catch (error) {
        console.error("Cancel booking error:", error); //  important
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


