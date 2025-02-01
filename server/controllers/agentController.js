import AgentOrder from "../models/agentOrderSchema.js"; // Import the AgentOrder model
import Otp from "../models/userSchema.js";
import Order from "../models/orderSchema.js";
import Address from "../models/addresschema.js";

// Create a new agent order associated with a user
export const createAgentOrder = async (req, res) => {
  try {
    const {
      userID, // Associate the order with a user
      fabricPickedUp,
      measurementDone,
      apparelDelivered,
      paymentReceived,
    } = req.body;

    console.log(req.body);

    // Validate that userID is provided
    if (!userID) {
      return res
        .status(400)
        .json({ message: "UserID is required to create an agent order" });
    }

    // Create a new agent order
    const newAgentOrder = new AgentOrder({
      userID,
      fabricPickedUp,
      measurementDone,
      apparelDelivered,
      paymentReceived,
    });

    await newAgentOrder.save();
    res
      .status(201)
      .json({
        message: "Agent order created successfully",
        order: newAgentOrder,
      });
  } catch (error) {
    console.error("Error creating agent order:", error);
    res
      .status(500)
      .json({ message: "Error creating agent order from backend", error });
  }
};

// Get and update an agent order by ID
export const getAndUpdateAgentOrder = async (req, res) => {
  const { orderID } = req.query; // Get the order ID from the request params
  const updateData = req.body; // Get update data from the request body

  try {
    // Fetch the agent order by ID
    let order = await AgentOrder.findById(orderID).populate("userID"); // Populate user data if needed
    if (!order) {
      return res.status(404).json({ message: "Agent order not found" });
    }

    // If update data is provided, update the order
    if (Object.keys(updateData).length > 0) {
      order = await AgentOrder.findByIdAndUpdate(id, updateData, {
        new: true,
      }).populate("userID");
      return res
        .status(200)
        .json({ message: "Agent order updated successfully", order });
    }

    // If no update data, just return the fetched order
    res
      .status(200)
      .json({ message: "Agent order fetched successfully", order });
  } catch (error) {
    console.error("Error fetching or updating agent order:", error);
    res
      .status(500)
      .json({
        message: "Error fetching or updating agent order from backend",
        error,
      });
  }
};

export const getAgentOrder = async (req, res) => {
  const { orderID, userID } = req.query;

  try {
    const order = await AgentOrder.find({ orderID, userID });

    if (!order) {
      return res.status(404).json({ message: "Agent order not found" });
    }

    res.status(200).json({
      message: "Agent order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Error fetching agent order:", error);
    res.status(500).json({ message: "Error fetching agent order", error });
  }
};

// export const updateAgentOrder = async (req, res) => {
//   const { orderID, userID } = req.query; // Get the order ID and user ID from the request params
//   const updateData = req.body; // Get update data from the request body

//   try {
//     // Check if update data is provided
//     if (!updateData || Object.keys(updateData).length === 0) {
//       return res.status(400).json({ message: "No update data provided" });
//     }

//     // Find and update the agent order based on orderID and userID
//     const updatedOrder = await AgentOrder.findOneAndUpdate(
//       { _id: orderID, userID }, // Query to match both orderID and userID
//       updateData, // Update data
//       { new: true } // Return the updated document
//     ).populate("userID");

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Agent order not found" });
//     }

//     // Return the updated order
//     res.status(200).json({ message: "Agent order updated successfully", order: updatedOrder });
//   } catch (error) {
//     console.error("Error updating agent order:", error);
//     res.status(500).json({ message: "Error updating agent order", error });
//   }
// };

// export const updateAgentOrder = async (req, res) => {
//   const { orderID, userID } = req.query; // Extract orderID and userID from query params
//   const updateData = req.body.updateData; // Extract update data from the request body

//   try {
//     // Validate input
//     if (!userID || !orderID) {
//       return res.status(400).json({ message: "userID and orderID are required" });
//     }

//     if (updateData && Object.keys(updateData).length === 0) {
//       return res.status(400).json({ message: "No update data provided" });
//     }

//     // Check if the user exists
//     const userExists = await Otp.findById(userID); // Assuming 'User' is your user schema
//     if (!userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Find and update the order if it exists
//     let agentOrder = await AgentOrder.findOneAndUpdate(
//       { orderID, userID }, // Query condition to match orderID and userID
//       updateData, // Update data
//       { new: true } // Return the updated document
//     ).populate("userID");

//     if (agentOrder) {
//       return res.status(200).json({
//         message: "Agent order updated successfully",
//         order: agentOrder,
//       });
//     } else {
//       // If the order does not exist, create a new one
//       agentOrder = new AgentOrder({
//         fabricPickedUp: false, // Default values
//         measurementDone: false,
//         apparelDelivered: false,
//         paymentReceived: false,
//         userID,
//         orderID,
//         ...updateData, // Apply any initial updates if provided
//       });

//       const newAgentOrder = await agentOrder.save();

//       return res.status(201).json({
//         message: "Agent order created successfully",
//         order: newAgentOrder,
//       });
//     }
//   } catch (error) {
//     console.error("Error processing agent order:", error);
//     res.status(500).json({ message: "Error processing agent order", error });
//   }
// };

export const updateAgentOrder = async (req, res) => {
  const { orderID, userID } = req.query; // Extract orderID and userID from query params
  const updateData = req.body.updateData; // Extract update data from the request body

  try {
    // Validate input
    if (!userID || !orderID) {
      return res
        .status(400)
        .json({ message: "userID and orderID are required" });
    }

    if (updateData && Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Check if the user exists
    const userExists = await Otp.findById(userID); // Assuming 'Otp' is your user schema
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find and update the agent order
    let agentOrder = await AgentOrder.findOneAndUpdate(
      { orderID, userID },
      updateData,
      { new: true }
    ).populate("userID");

    if (agentOrder) {
      // Dynamically update the order status based on the current fields
      const {
        fabricPickedUp,
        measurementDone,
        apparelDelivered,
        paymentReceived,
      } = agentOrder;

      if (
        fabricPickedUp &&
        measurementDone &&
        apparelDelivered &&
        paymentReceived
      ) {
        agentOrder.status = "done"; // Update status to "done" when all conditions are true
      } else {
        agentOrder.status = "pending"; // Otherwise, keep the status as "pending"
      }

      // Save the updated agent order
      await agentOrder.save();

      // Also update the status in the corresponding Order schema without changing other fields
      const associatedOrder = await Order.findById(orderID);
      if (associatedOrder) {
        associatedOrder.status = agentOrder.status; // Only update the status field
        await associatedOrder.save(); // Save the updated status in the order
      }

      return res.status(200).json({
        message: "Agent order updated successfully",
        order: agentOrder,
      });
    } else {
      // If the agent order does not exist, create a new one
      agentOrder = new AgentOrder({
        fabricPickedUp: false,
        measurementDone: false,
        apparelDelivered: false,
        paymentReceived: false,
        userID,
        orderID,
        ...updateData,
      });

      const newAgentOrder = await agentOrder.save();

      // Only create a new order if it doesn't exist
      const associatedOrder = await Order.findById(orderID);
      if (!associatedOrder) {
        // Optionally handle the case where the order doesn't exist, or you can skip this part.
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(201).json({
        message: "Agent order created successfully",
        order: newAgentOrder,
      });
    }
  } catch (error) {
    console.error("Error processing agent order:", error);
    res.status(500).json({ message: "Error processing agent order", error });
  }
};

export const getAgentDetails = async (req, res) => {
  const { orderID, userID } = req.query; // Extracting the orderID and userID from the query parameters

  try {
    // Validate input
    if (!orderID || !userID) {
      return res
        .status(400)
        .json({ message: "orderID and userID are required" });
    }

    // Fetch the agent order using orderID and userID
    const agentOrder = await AgentOrder.findOne({ orderID, userID }).populate(
      "userID orderID"
    );

    // Check if agentOrder is found
    if (!agentOrder) {
      return res.status(404).json({ message: "Agent order not found" });
    }

    // Return the agent order details
    return res
      .status(200)
      .json({ message: "Agent order found", data: agentOrder });
  } catch (error) {
    console.error("Error fetching agent order details:", error);
    res
      .status(500)
      .json({ message: "Error fetching agent order details", error });
  }
};

export const getAddressByID = async (req, res) => {
  const { addressID } = req.query;
  if (!addressID) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  console.log("Received addressID:", addressID);

  try {
    // Check if the user exists
    const address = await Address.findById(addressID);
    console.log("Address found:", address);

    if (!address) {
      return res.status(404).json({ message: "address not found" });
    }

    // Get address using the userID
    // const getAddress = await Address.find({ userID: user._id });
    // console.log("Address found:", getAddress);

    // if (!getAddress.length) {
    //   return res.status(404).json({ message: "Address not found" });
    // }

    return res
      .status(200)
      .json({ message: "Successfully got address", address });
  } catch (error) {
    console.error("Error in getAddressByNumber:", error);

    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
