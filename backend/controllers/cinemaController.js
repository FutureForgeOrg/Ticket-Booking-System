import Cinema from "../models/Cinema.js";

export const createCinema = async (req, res) => {
    try {
        const { name, location, screens } = req.body;

        if (!name || !location || !screens?.length) {
            return res.status(400).json({
                message: "Name, location and screens are required"
            });
        }

        const cinema = await Cinema.create({
            name, location, screens
        })

        res.status(201).json({
            message: "cinema created succesfully",
            cinema
        })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

//add screen to existing Cinema

export const addScreenToCinema = async (req, res) => {
    try {
        const { cinemaId } = req.params;
        const { name, seats } = req.body;

        if (!name || !seats?.length) {
            return res.status(400).json({
                message: "Screen name and seats are required"
            });
        }

        const cinema = await Cinema.findById(cinemaId)
        if (!cinema) {
            return res.status(404).json({
                message: "Cinema not found"
            });
        }


        //prevent duplicate scrren name
        const exists = cinema.screens.find(
            (screen) => screen.name === name
        )

        if (exists) {
            return res.status(409).json({
                message: "screen already exists"
            })
        }

        cinema.screens.push({ name, seats });
        await cinema.save()

        res.status(201).json({
            message: "screen added successfully",
            screens: cinema.screens

        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}

//get all cinema
export const getAllCinemas = async (req, res) => {

    try {
        const cinemas = await Cinema.find();

        res.status(200).json(cinemas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get cinema by id

export const getCinemaById = async (req, res) => {
    try {
        const cinema = await Cinema.findById(req.params.id);

        if (!cinema) {
            return res.status(404).json({
                message: "Cinema not found"
            });
        }

        res.status(200).json(cinema);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//delete cinema

export const deleteCinema = async (req, res) => {
    try {
        const cinema = await Cinema.findByIdAndDelete(req.params.id);

        if (!cinema) {
            return res.status(404).json({
                message: "Cinema not found"
            });
        }

        res.status(200).json({
            message: "Cinema deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

