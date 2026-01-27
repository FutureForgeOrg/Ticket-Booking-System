import Cinema from "../models/Cinema.js";
import getPagination from "../utils/pagination.js";

export const getAllCinemas = async (req, res) => {
  const { city, state, isSeatsIncluded } = req.query;
  const { page, limit, skip } = getPagination(req)
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
      ).skip(skip).limit(limit);
    }

    else {
      cinemas = await Cinema.find(query).skip(skip).limit(limit);
    }

    res.status(200).json({
      success: true,
      data: cinemas,
      totalCinemas: cinemas.length,
      page,
      limit
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

    // Basic validation
    if (!name || !location || !screens?.length) {
      return res.status(400).json({
        success: false,
        message: "Name, location, and screens are required",
      });
    }


    const formattedScreens = screens.map((screen) => {
      const { name, layout } = screen;

      if (!name || !layout?.rows?.length) {
        throw new Error("Each screen must have a name and at least one row");
      }

      return {
        name,
        layout,
      };
    });

    // Create cinema
    const cinema = await Cinema.create({
      name,
      location,
      screens: formattedScreens,
    });

    res.status(201).json({
      success: true,
      message: "Cinema created successfully",
      cinema,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addScreenToCinema = async (req, res) => {
  try {
    const { cinemaId } = req.params;
    const { name, layout } = req.body;

   
    if (!name || !layout?.rows?.length) {
      return res.status(400).json({
        success: false,
        message: "Screen name and layout rows are required",
      });
    }

    // Find cinema
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return res.status(404).json({
        success: false,
        message: "Cinema not found",
      });
    }

    // Check if screen already exists
    const exists = cinema.screens.find((screen) => screen.name === name);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Screen already exists",
      });
    }

    // Add new screen
    cinema.screens.push({
      name,
      layout, // use layout directly
    });

    await cinema.save();

    res.status(201).json({
      success: true,
      message: "Screen added successfully",
      screen: {
        name,
        totalRows: layout.rows.length,
      },
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

