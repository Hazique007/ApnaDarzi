import Order from "../models/orderSchema.js";
import PersonalDetails from "../models/personaldetailsSchema.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userID,
      addressID,
      category,
      status,
      categoryDescription,
      colors,
      customizationOptions,
      description,
      fabric,
      gender,
      images,
      isCustomized,
      name,
      price,
      sizes,
      stock,
      subCategory,
    } = req.body;

    console.log(req.body);

    if (!userID) {
      return res
        .status(400)
        .json({ message: "UserID is required to create an order" });
    }

    const newOrder = new Order({
      userID,
      addressID,
      category,
      categoryDescription,
      colors,
      customizationOptions,
      description,
      fabric,
      status,
      gender,
      images,
      isCustomized,
      name,
      price,
      sizes,
      stock,
      subCategory,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating from backend", error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderID } = req.query;

    if (!orderID || !userID) {
      return res
        .status(400)
        .json({ message: "OrderID and userID are required" });
    }

    const order = await Order.findById(orderID);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "done";

    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userID", "phoneNumber");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrdersGroupedByDate = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Ensure default values
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("addressID") // <-- Ensures address details are included
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .lean();

    const userIds = [...new Set(orders.map((order) => order.userID))];

    const personalDetails = await PersonalDetails.find({
      userID: { $in: userIds },
    }).lean();

    const userMap = personalDetails.reduce((acc, details) => {
      acc[details.userID.toString()] = details.name;
      return acc;
    }, {});

    const enrichedOrders = orders.map((order) => ({
      ...order,
      userName: userMap[order.userID.toString()] || "Unknown User",
    }));

    const groupedOrders = enrichedOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});

    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({ groupedOrders, totalPages, currentPage: page });
  } catch (error) {
    console.error("Error in getOrdersGroupedByDate:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res
        .status(400)
        .json({ message: "UserID is required to fetch orders" });
    }

    const userOrders = await Order.find({ userID }); // Use find() to query by userID
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderID } = req.query;

    const order = await Order.findById(orderID);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await PersonalDetails.find({ userID: order.userID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = {
      user,
      order,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("userID", "phoneNumber");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

export const updateOrderStatustoDone = async (req, res) => {
  try {
    const { orderID, userID } = req.body;

    if (!orderID || !userID) {
      return res
        .status(400)
        .json({ message: "OrderID and userID are required" });
    }

    const order = await Order.findOne({ _id: orderID, userID });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "done";

    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error in updating order status:", error);
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};
