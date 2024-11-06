const { Finathone } = require('../model/finathoneUser');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Finathone.find().sort({ _id: -1 }); // You can also add sorting, limiting, etc.
    // Send the response back with the list of users
    res.status(200).json({ status: "OK", users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: "ERROR",
      message: "An error occurred while fetching users",
    });
  }
};
