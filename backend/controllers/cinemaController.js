import Cinema from "../models/Cinema.js";
import getFinalLayoutConfig from "../config/layout/layoutConfig.js"
import generateLayout from "../config/layout/generateLayout.js"

export const getAllCinemas = async (req, res) => {
    const { city, state, isSeatsIncluded } = req.query;
    try {

        const query = {};
        if (state) {
            query["location.state"] = state;
        }
        if (city) {
            query["location.city"] = city;
        }

        let cinemas;


        if (isSeatsIncluded === "false") {
            cinemas = await Cinema.find(query).select(
                "_id name screens.name"
            );
        }

        else {
            cinemas = await Cinema.find(query);
        }

        res.status(200).json({
            success: true,
            data: cinemas,
            totalCinemas: cinemas.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCinemaById = async (req, res) => {
    try {
        const cinema = await Cinema.findById(req.params.id);

        if (!cinema) {
            return res.status(404).json({
                success: false,
                message: "Cinema not found"
            });
        }

        res.status(200).json({
            success: true,
            data: cinema
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteCinema = async (req, res) => {
    try {
        const cinema = await Cinema.findByIdAndDelete(req.params.id);

        if (!cinema) {
            return res.status(404).json({
                success: false,
                message: "Cinema not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cinema deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const createCinema = async (req, res) => {
    try {
        const { name, location, screens } = req.body;

        if (!name || !location || !screens?.length) {
            return res.status(400).json({
                success: false,
                message: "Name, location and screens are required"
            });
        }

        const formattedScreens = screens.map(screen => {
            const { name, preset, rowGap, rows } = screen;

            if (!name || !preset || !rows?.length) {
                throw new Error("Each screen must have name, preset and rows");
            }

            // preset defaults only
            const presetConfig = getFinalLayoutConfig(preset);

            // hierarchical resolution inside generateLayout
            const layout = generateLayout({
                preset: presetConfig,
                rowGapOverride: rowGap,
                rows
            });

            return { name, layout };
        });

        const cinema = await Cinema.create({
            name,
            location,
            screens: formattedScreens
        });

        res.status(201).json({
            success: true,
            message: "Cinema created successfully",
            cinema
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addScreenToCinema = async (req, res) => {
    try {
        const { cinemaId } = req.params;
        const { name, preset, rowGap, rows } = req.body;

        if (!name || !preset || !rows?.length) {
            return res.status(400).json({
                success: false,
                message: "Screen name, preset and rows are required"
            });
        }

        const cinema = await Cinema.findById(cinemaId);
        if (!cinema) {
            return res.status(404).json({
                success: false,
                message: "Cinema not found"
            });
        }

        const exists = cinema.screens.find(screen => screen.name === name);
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Screen already exists"
            });
        }

        const presetConfig = getFinalLayoutConfig(preset);

        const layout = generateLayout({
            preset: presetConfig,
            rowGapOverride: rowGap,
            rows
        });

        cinema.screens.push({ name, layout });
        await cinema.save();

        res.status(201).json({
            success: true,
            message: "Screen added successfully",
            screen: { name, totalRows: rows.length }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

