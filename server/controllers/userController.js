const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
    const newUser = new User({
      email,
      password,
      name,
      surname,
      role: "skater",
    }); // Include name and surname

    // Save the new user to the database
    await newUser.save();

    // Create JWT payload including the role
    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role, // Include the role in the JWT payload
    };

    // Generate JWT Token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "User created successfully", token: token });
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
      role: user.role, // Include the role in the JWT payload
    };

    // Generate JWT Token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

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
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
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
    const users = await User.find({}).select("_id name surname"); // Select only ID, name, and surname
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET Skater user data
exports.getSkaterUsers = async (req, res) => {
  try {
    const skaterUsers = await User.find({ role: "skater" });
    res.status(200).json(skaterUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update Skater Profile Information
exports.updateSkaterProfile = async (req, res) => {
  try {
    const skaterId = req.params.userId; // Extracting skater ID from URL parameters
    const updateData = req.body; // Data to be updated

    // Optional: Validate updateData or filter out unwanted fields

    // Find the skater by ID and update their profile
    const updatedSkater = await User.findByIdAndUpdate(skaterId, updateData, {
      new: true,
    });
    if (!updatedSkater) {
      return res.status(404).json({ error: "Skater not found" });
    }

    res
      .status(200)
      .json({
        message: "Skater profile updated successfully",
        skater: updatedSkater,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Purchase New PatchCard
exports.purchasePatchCard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 3)
    );

    // Generate new patch card number and purchase invoice number
    const newPatchCardNumber =
      "PC" + Math.floor(Math.random() * 10000).toString();
    const newPurchaseInvoiceNumber =
      "INV" + Math.floor(Math.random() * 10000).toString();

    // Fetch the current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create five new patches
    const newPatches = Array.from({ length: 5 }, () => ({
      used: false,
      // dateUsed: null, I've commented this out because I think this line is no longer necessary. 
      partOfDay: null,
    }));

    // Update user document with new patches, increment patchesRemaining, and update card and invoice numbers
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { patches: { $each: newPatches } },
        $set: {
          patchesRemaining: 5, // Reset patchesRemaining to 5
          patchCardNumber: newPatchCardNumber,
          purchaseInvoiceNumber: newPurchaseInvoiceNumber,
          datePurchased: new Date().toISOString().split("T")[0], // Set the purchase date
          expiryDate: expiryDate.toISOString().split("T")[0], // Set the expiry date
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({
        message: "Patch card purchased successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserPatch = async (req, res) => {
  try {
    const { userId, patchId } = req.params;
    const patchData = req.body; // Contains the updated data for the patch

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const patchIndex = user.patches.findIndex(patch => patch._id.toString() === patchId);
    if (patchIndex === -1) {
      return res.status(404).json({ error: "Patch not found" });
    }

    // Check if the patch is already used
    if (user.patches[patchIndex].used) {
      user.patches[patchIndex].updated = true; // Set the updated field to true
      // Update other fields as necessary
      user.patches[patchIndex].dateUsed = patchData.dateUsed;
      user.patches[patchIndex].partOfDay = patchData.partOfDay;
    } else if (patchData.used) {
      user.patchesRemaining = Math.max(0, user.patchesRemaining - 1);
      user.patches[patchIndex].dateUsed = patchData.dateUsed;
      user.patches[patchIndex].updated = true; // Set the updated field to true
    }

    user.patches[patchIndex] = { ...user.patches[patchIndex].toObject(), ...patchData };

    user.markModified('patches');
    await user.save();

    res.status(200).json({ message: "Patch updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get Patch dateUsed for specific user and patch:

exports.getDateUsed = async (req, res) => {
  try {
    const { userId, patchId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const patch = user.patches.find(p => p._id.toString() === patchId);
    if (!patch) {
      return res.status(404).json({ error: "Patch not found" });
    }

    // Send back the dateUsed of the patch
    res.status(200).json({ dateUsed: patch.dateUsed });
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
