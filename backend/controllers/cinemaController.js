import Cinema from "../models/Cinema.js";

export const createCinema = async (req, res) => {
    try {
        const { name, location, screens } = req.body;

        if (!name || !location || !screens?.length) {
            return res.status(400).json({
                success: false,
                message: "Name, location and screens are required"
            });
        }

        const cinema = await Cinema.create({
            name, location, screens
        })

        res.status(201).json({
            success: true,
            message: "cinema created succesfully",
            cinema
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

//add screen to existing Cinema

export const addScreenToCinema = async (req, res) => {
    try {
        const { cinemaId } = req.params;
        const { name, seats } = req.body;

        if (!name || !seats?.length) {
            return res.status(400).json({
                success: false,
                message: "Screen name and seats are required"
            });
        }

        const cinema = await Cinema.findById(cinemaId)
        if (!cinema) {
            return res.status(404).json({
                success: false,
                message: "Cinema not found"
            });
        }


        //prevent duplicate scrren name
        const exists = cinema.screens.find(
            (screen) => screen.name === name
        )

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "screen already exists"
            })
        }

        cinema.screens.push({ name, seats });
        await cinema.save()

        res.status(201).json({
            success: true,
            message: "screen added successfully",
            screens: cinema.screens

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }


}

//get all cinema
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

//get cinema by id

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


//delete cinema

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

