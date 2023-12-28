const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Create a new registered user
exports.createUser = async (req, res) => {
  try {
    const { email, password, name, surname } = req.body; // Extract name and surname

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create a new user with email, password, name, and surname
    const newUser = new User({ email, password, name, surname, role: 'skater' }); // Include name and surname

    // Save the new user to the database
    await newUser.save();

    // Create JWT payload including the role
    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role // Include the role in the JWT payload
    };

    // Generate JWT Token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User created successfully", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//User Login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // User is authenticated, create a JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role // Include the role in the JWT payload
    };

    // Generate JWT Token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user profile details
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you're passing the user ID as a URL parameter
    const updateData = req.body; // Data to be updated

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET Individual user data

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Optionally, remove sensitive data like password before sending the user data
    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET All user data

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('_id name surname'); // Select only ID, name, and surname
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET Skater user data
exports.getSkaterUsers = async (req, res) => {
  try {
    const skaterUsers = await User.find({ role: 'skater' });
    res.status(200).json(skaterUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Update Skater Profile Info

// Update Skater Profile Information
exports.updateSkaterProfile = async (req, res) => {
  try {
    const skaterId = req.params.userId; // Extracting skater ID from URL parameters
    const updateData = req.body; // Data to be updated

    // Optional: Validate updateData or filter out unwanted fields

    // Find the skater by ID and update their profile
    const updatedSkater = await User.findByIdAndUpdate(skaterId, updateData, { new: true });
    if (!updatedSkater) {
      return res.status(404).json({ error: "Skater not found" });
    }

    res.status(200).json({ message: "Skater profile updated successfully", skater: updatedSkater });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Purchase New PatchCard

exports.purchasePatchCard = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the current user to get the existing patchesRemaining count
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const currentPatchesRemaining = user.patchesRemaining || 0;

    // Create five new patches
    const newPatches = Array.from({ length: 5 }, () => ({
      used: false,
      dateUsed: null,
      partOfDay: null
    }));

    // Update user document with new patches and increment patchesRemaining
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { patches: { $each: newPatches } },
        $set: { patchesRemaining: currentPatchesRemaining + 5 } // Increment patchesRemaining by 5
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Patch card purchased successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update PatchCard Data
exports.updateUserPatch = async (req, res) => {
  try {
    const { userId, patchId } = req.params;
    const patchData = req.body; // Assuming this contains the updated data for the patch

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const patchIndex = user.patches.findIndex(patch => patch._id.toString() === patchId);
    if (patchIndex === -1) {
      return res.status(404).json({ error: "Patch not found" });
    }

    // Check if the patch is being marked as used and decrement patchesRemaining if so
    if (!user.patches[patchIndex].used && patchData.used) {
      user.patchesRemaining = Math.max(0, user.patchesRemaining - 1);
    }

    // Update the specific patch
    user.patches[patchIndex] = { ...user.patches[patchIndex].toObject(), ...patchData };

    await user.save();

    res.status(200).json({ message: "Patch updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//Delete User

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


