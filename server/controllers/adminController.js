const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.updateRole = async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  try {
    // TODO: Add Authentication and Authorization checks here and set up controller in front end eventually
    //to make it easier for otehr super users to authorise admins.
    // Ensure the requester is a super admin

    // Update the user's role
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a new JWT token with updated role
    const updatedPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const updatedToken = jwt.sign(updatedPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "User role updated successfully", token: updatedToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
