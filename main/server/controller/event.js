const event = require("../model/event.js");


exports.updateOne = async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedData = req.body;
      const updatedUser = await user.findOneAndUpdate(
        { id: userId },
        updatedData,
        { new: false }
      );
      if (!updatedUser) {
        return res
          .status(404)
          .send({ status: "error", message: "User not found" });
      }
      res.send({ status: "ok", data: updatedUser });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Failed to update user",
        error: error.message,
      });
      console.error(`Error updating user: ${error}`);
    }
  };
