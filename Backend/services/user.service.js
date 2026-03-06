const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = new userModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  // persist to database
  await user.save();
  return user;
};

// helper to find user by email (includes password for comparison)
module.exports.getUserByEmail = async (email) => {
  return await userModel.findOne({ email }).select("+password");
};
