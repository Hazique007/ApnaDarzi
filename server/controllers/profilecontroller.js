import Profile from "../models/profileschema.js"


// Create a new profile
export const createProfile = async (req, res) => {
    try {
      const { userId, personalDetails } = req.body;
  
      // Check if the profile already exists
      const existingProfile = await Profile.findOne({ userId });
      if (existingProfile) {
        return res.status(400).json({ message: "Profile already exists for this user." });
      }
  
      const newProfile = new Profile({ userId, personalDetails });
      await newProfile.save();
  
      res.status(201).json(newProfile);
    } catch (err) {
      res.status(500).json({ message: "Error creating profile", error: err.message });
    }
  };
  
  // Get a user's profile
  export const getProfile = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
  };
  
  // Update a user's profile
  export const updateProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
  
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId },
        updatedData,
        { new: true } // Return the updated document
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      res.status(200).json(updatedProfile);
    } catch (err) {
      res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  };
  
  // Add an address to a user's profile
  export const addAddress = async (req, res) => {
    try {
      const { userId } = req.params;
      const newAddress = req.body;
  
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      profile.addresses.push(newAddress);
      await profile.save();
  
      res.status(200).json(profile.addresses);
    } catch (err) {
      res.status(500).json({ message: "Error adding address", error: err.message });
    }
  };
  
  // Add an order to a user's profile
  export const addOrder = async (req, res) => {
    try {
      const { userId } = req.params;
      const newOrder = req.body;
  
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      profile.orders.push(newOrder);
      await profile.save();
  
      res.status(200).json(profile.orders);
    } catch (err) {
      res.status(500).json({ message: "Error adding order", error: err.message });
    }
  };
  
  // Add a support ticket
  export const addSupportTicket = async (req, res) => {
    try {
      const { userId } = req.params;
      const newTicket = req.body;
  
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      profile.helpAndSupport.push(newTicket);
      await profile.save();
  
      res.status(200).json(profile.helpAndSupport);
    } catch (err) {
      res.status(500).json({ message: "Error adding support ticket", error: err.message });
    }
  };
  
  // Fetch all notifications
  export const getNotifications = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      res.status(200).json(profile.notifications);
    } catch (err) {
      res.status(500).json({ message: "Error fetching notifications", error: err.message });
    }
  };
  
  // Mark a notification as read
  export const markNotificationAsRead = async (req, res) => {
    try {
      const { userId, notificationId } = req.params;
  
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }
  
      const notification = profile.notifications.id(notificationId);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found." });
      }
  
      notification.read = true;
      await profile.save();
  
      res.status(200).json(profile.notifications);
    } catch (err) {
      res.status(500).json({ message: "Error marking notification as read", error: err.message });
    }
  };