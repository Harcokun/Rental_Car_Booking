const CarProvider = require("../models/CarProvider.js");

//@desc     GET all car providers
//@routes   GET /api/v1/carproviders
//@access   Public
exports.getCarProviders = async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  //Loop over remove fields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);

  //Create query string
  let queryStr = JSON.stringify(req.query);

  //Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Finding resource
  query = CarProvider.find(JSON.parse(queryStr)).populate("bookings");

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createAt");
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await CarProvider.countDocuments();
  //console.log(startIndex, page, limit);

  query = query.skip(startIndex).limit(limit);

  try {
    //Executing query
    const carproviders = await query;

    //Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    res.status(200).json({
      success: true,
      count: carproviders.length,
      pagination,
      data: carproviders,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     GET single car providers
//@routes   GET /api/v1/carproviders/:id
//@access   Public
exports.getCarProvider = async (req, res, next) => {
  try {
    const carprovider = await CarProvider.findById(req.params.id);
    if (!carprovider) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: carprovider });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     CREATE new car provider
//@routes   POST /api/v1/carproviders
//@access   Public
exports.createCarProvider = async (req, res, next) => {
  // console.log(req.body);
  // res.status(200).json({success: true, msg: 'Create new car provider'});

  const carprovider = await CarProvider.create(req.body);
  res.status(201).json({
    success: true,
    data: carprovider,
  });
};

//@desc     Update car provider
//@routes   PUT /api/v1/carproviders/:id
//@access   Public
exports.updateCarProvider = async (req, res, next) => {
  try {
    const carprovider = await CarProvider.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!carprovider) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: carprovider });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//@desc     Delete car provider
//@routes   DELETE /api/v1/carproviders/:id
//@access   Public
exports.deleteCarProvider = async (req, res, next) => {
  try {
    const carproviders = await CarProvider.findById(req.params.id);

    if (!carproviders) {
      return res.status(400).json({
        success: false,
        message: `Bootcamp not found with id of ${req.params.id}`,
      });
    }

    carproviders.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
