import Address from "../models/addresschema.js";
import Otp from "../models/userSchema.js";

// Add a new address
export const addAddressbyuserID = async (req, res) => {
  try {
    const { name, address1, address2, pincode, userID } = req.body;

    if (!name || !address1 || !address2 || !pincode || !userID) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = await Address.create({
      name,
      address1,
      address2,
      pincode,
      userID,
    });
    // console.log(newAddress);

    res.status(201).json({
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({ data: addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit an existing address
export const editAddress = async (req, res) => {
  const { userID } = req.params;
  const updatedData = req.body;

  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { userID },
      updatedData,
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found for this userID" });
    }

    res
      .status(200)
      .json({ message: "Address updated successfully", data: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res
      .status(500)
      .json({ message: "Error updating address", error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address1, address2, pincode } = req.body;

    if (!name || !address1 || !address2 || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { name, address1, address2, pincode },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ message: "Address updated successfully", data: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ message: "Address deleted successfully", data: deletedAddress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get Adress with userID

export const getAddressByUser = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res
        .status(400)
        .json({ message: "UserID is required to fetch address" });
    }

    const userAddress = await Address.find({ userID });
    res.status(200).json({ data: userAddress });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user address", error });
  }
};
