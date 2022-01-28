import { Queries } from "../models/queries.js";

// create a query
export const CreateQuery = async (req, res) => {
  // check if message is empty
  if (!req.body.message) {
    return res.status(400).json({
      success: false,
      message: "Missing message",
    });
  }
  try {
    const query = await Queries.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Received, I will get back to you soon!",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fill all fields correctly!",
    });
  }
};

// delete a query
export const DeleteQuery = async (req, res) => {
  const id = req.params.id;
  const query = await Queries.findById(id.toString());

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "No query found",
    });
  }

  try {
    await Queries.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: {
        message: "Query deleted",
        queryId: req.params.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong...",
    });
  }
};

// get all queries
export const GetAllQueries = async (req, res) => {
  const queries = await Queries.find();
  res.status(200).send(queries);
};

// getting one query
export const getQueryById = async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      message: "missing query id",
    });
  }

  const id = req.params.id;
  const query = await Queries.findById(id);

  if (!query) {
    return res.status(500).json({
      success: false,
      message: "not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {
      data: query,
    },
  });
};

// search queries
export const SearchQueries = async (req, res) => {
  const queries = await Queries.find({
    $text: { $search: req.query.q },
  });
  res.status(200).json({
    success: true,
    data: queries,
  });
};
