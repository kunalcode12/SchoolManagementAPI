const catchAsync = require("../utils/catchasync");
const AppError = require("../utils/appError");
const dataBase1 = require("../db");
const validator = require("validator");
const { isValidSchoolName, validateAddress } = require("./validatorController");
const calculateDistance = require("../utils/apiFeature");

exports.addSchool = catchAsync(async (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  //Checking if these fields exist is request
  if (!name || !address || latitude === undefined || longitude === undefined) {
    next(
      new AppError(
        "Please provide name, address, latitude, and longitude.",
        400
      )
    );
  }
  //Checking for valid name
  if (
    !validator.isAlphanumeric(name, "en-US", { ignore: " -" }) ||
    !validator.isLength(name, { min: 3, max: 100 })
  ) {
    return next(new AppError("Invalid school name.", 400));
  }

  if (!isValidSchoolName(name)) {
    return next(
      new AppError("Invalid school name. Please provide a valid name.", 400)
    );
  }

  //Checking for valid address
  if (!validateAddress(address)) {
    next(new AppError("Please provide a valid address.", 400));
  }

  //Checking for valid latitude and longitude
  if (!validator.isLatLong(`${latitude},${longitude}`)) {
    next(new AppError("Please provide valid latitude or longitude", 402));
  }
  const [existingSchool] = await dataBase1.query(
    "SELECT * FROM school_info WHERE name = ? AND address = ?",
    [name, address]
  );

  //Checking if request school is already in database
  if (existingSchool.length > 0) {
    return next(
      new AppError("School with this name and address already exists.", 409)
    );
  }

  //Inserting in database
  const insertQuery = await dataBase1.query(
    "INSERT INTO school_info SET name=?,address=?,latitude=?,longitude=?",
    [name, address, latitude, longitude]
  );

  res.status(201).json({
    status: "success",
    message: "New school added successfully!",
    data: {
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
    },
  });
});

//Provide all schools in DB
exports.getAllSchools = catchAsync(async (req, res, next) => {
  let sql = "SELECT * FROM school_info;";
  const [schools] = await dataBase1.query(sql);

  if (!schools || schools.length === 0) {
    return next(new AppError("No schools data found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      schools,
    },
  });
});

//Provide the Sorted school according to the user lat,lng
exports.getSortedSchools = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;

  const [lat, lng] = latlng.split(",");

  //checking for valid lat and lng
  if (!validator.isLatLong(`${lat},${lng}`)) {
    next(new AppError("Please provide valid latitude or longitude", 402));
  }

  if (!lat || !lng) {
    return next(
      new AppError(
        "Please provide latitude and longitude in the format lat,lng",
        400
      )
    );
  }

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  let sql = "SELECT * FROM school_info;";
  const [schools] = await dataBase1.query(sql);

  //calculating the distance b/w latidude and longitude given by user with all the latitude and longitude on database
  const schoolsWithDistance = schools.map((school) => {
    const distance = parseFloat(
      calculateDistance(lat * 1, lng * 1, school.latitude, school.longitude) *
        multiplier
    ).toFixed(2);
    return { ...school, distance };
  });

  //Sorting the schools in nearest to user
  const sortedSchools = schoolsWithDistance.sort(
    (a, b) => a.distance - b.distance
  );

  res.status(200).json({
    status: "success",
    results: sortedSchools.length,
    data: {
      schools: sortedSchools,
    },
  });
});
