import Event from '../models/Event.js';
import EventBooking from '../models/EventBooking.js';
import cloudinary from '../config/cloudinary.js';
import { getPublicIdFromUrlOfEvents, uploadBufferToCloudinary } from "../utils/mediaUtils.js";
import pagination from '../utils/pagination.js';
// Create a new event
export const createEvent = async (req, res) => {

    try {
        if (!req.files?.poster || !req.files?.banner) {
            return res.status(400).json({
                success: false,
                message: "Poster and banner image are required"
            });
        }

        // Upload image to Cloudinary
        const [posterResult, bannerResult] = await Promise.all([
            uploadBufferToCloudinary(
                req.files.poster[0].buffer,
                "events/posters"
            ),
            uploadBufferToCloudinary(
                req.files.banner[0].buffer,
                "events/banners"
            )
        ]);

        const event = await Event.create({
            ...req.body,
            categories: JSON.parse(req.body.categories),
            posterUrl: posterResult.secure_url,
            bannerUrl: bannerResult.secure_url
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


       //delete old image and upload new one if new image is uploaded
            if (req.files?.poster){
                const publicId = getPublicIdFromUrlOfEvents(event.posterUrl);
                 await cloudinary.uploader.destroy(publicId);
                const posterResult = await uploadBufferToCloudinary(
                    req.files.poster[0].buffer,
                    "events/posters"
                );
                updateData.posterUrl = posterResult.secure_url;
            }
        
        if (req.files?.banner){
            const publicId = getPublicIdFromUrlOfEvents(event.bannerUrl);
             await cloudinary.uploader.destroy(publicId);
            const bannerResult = await uploadBufferToCloudinary(
                req.files.banner[0].buffer,
                "events/banners"
            );
             updateData.bannerUrl = bannerResult.secure_url;
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

//get trending events
export const getTrendingEvents = async (req, res) => {
    try {
        const { city, eventType } = req.query;
        const { page, limit, skip } = pagination(req);

        const filter = {};
        if (city) filter.city = city;
        if (eventType) filter.eventType = eventType;

        const events = await Event.aggregate([
            { $match: filter },
            { $addFields: { totalAvailableSeats: { $sum: "$categories.availableSeats" } } },
            { $sort: { totalAvailableSeats: 1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

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

// Get a single event booking by booking id
export const getEventBookingById = async (req, res) => {
    try {
        const booking = await EventBooking.findById(req.params.id).populate("event");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Event booking not found"
            });
        }

        res.status(200).json({
            success: true,
            booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const bookEventSeats = async (req, res) => {
    try {
        const { eventId, category, numberOfSeats } = req.body;
        const userId = req.user._id;

        if (!eventId || !category || !numberOfSeats) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

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

        // Lock seats (reduce temporarily)
        selectedCategory.availableSeats -= numberOfSeats;
        await event.save();

        const totalAmount = selectedCategory.price * numberOfSeats;

        const booking = await EventBooking.create({
            user: userId,
            event: eventId,
            category,
            numberOfSeats,
            totalAmount,
            status: "PENDING",
            expiresAt: new Date(Date.now() + 2 * 60 * 1000)
        });

        res.status(201).json({
            success: true,
            message: "Seats locked. Proceed to payment.",
            bookingId: booking._id,
            totalAmount,
            expiresAt: booking.expiresAt
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//confirm booking after successful payment
export const confirmEventBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user._id;

        const booking = await EventBooking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (booking.status === "CONFIRMED") {
            return res.json({ message: "Booking already confirmed" });
        }

        if (booking.status !== "PENDING") {
            return res.status(400).json({ message: "Booking already processed" });
        }

        if (new Date() > booking.expiresAt) {
            booking.status = "EXPIRED";

            const event = await Event.findById(booking.event);
            const category = event.categories.find(
                (cat) => cat.name === booking.category
            );

            category.availableSeats += booking.numberOfSeats;

            await event.save();
            await booking.save();

            return res.status(400).json({ message: "Booking expired" });
        }

        // CONFIRM BOOKING
        booking.status = "CONFIRMED";

        const event = await Event.findById(booking.event);
        event.bookingsCount += booking.numberOfSeats;

        await event.save();
        await booking.save();

        res.json({ message: "Event booking confirmed" });

    } catch (error) {
        res.status(500).json({ message: error.message });
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

        if (booking.status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                message: "Already cancelled"
            });
        }

        const event = await Event.findById(booking.event);
        const category = event.categories.find(
            (cat) => cat.name === booking.category
        );

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        // Release seats for pending bookings
        if (booking.status === "PENDING" || booking.status === "EXPIRED") {
            category.availableSeats += booking.numberOfSeats;
            booking.status = "CANCELLED";

            await event.save();
            await booking.save();

            return res.status(200).json({
                success: true,
                message: "Booking cancelled and seats released"
            });
        }

        // For confirmed bookings, also reduce bookings count
        if (booking.status === "CONFIRMED") {
            category.availableSeats += booking.numberOfSeats;
            event.bookingsCount -= booking.numberOfSeats;

            booking.status = "CANCELLED";

            await event.save();
            await booking.save();

            return res.status(200).json({
                success: true,
                message: "Booking cancelled successfully"
            });
        }

        return res.status(400).json({
            success: false,
            message: "Cannot cancel booking in its current state"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user's event bookings
export const getMyEventBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await EventBooking.find({ user: userId, status: "CONFIRMED" })
            .populate("event", "title posterUrl venue date")
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            message: "Event bookings fetched successfully",
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


