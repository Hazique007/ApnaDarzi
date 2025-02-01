import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

function FabricSelectionDialog(props) {
  const { open, onClose, userId, orderId, setAddresses } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleChoice = async (fabricProvidedByUser) => {
    console.log("handleChoice called with:", { fabricProvidedByUser }); // Debugging log

    setIsLoading(true); // Show loading indicator
    try {
      const url = orderId
        ? `http://localhost:5000/edit/${orderId}` // Update order
        : `http://localhost:5000/add`; // Create order
      const method = orderId ? "PUT" : "POST";

      console.log("API URL and Method:", { url, method }); // Debugging log

      const body = JSON.stringify({
        userId,
        fabricProvidedByUser,
        stitchingCharges: 1000, // Replace with actual data
        deliveryDate: new Date(), // Replace with actual data
        fabricStyle: "Casual", // Replace with actual data
      });

      console.log("Request Body:", body); // Debugging log

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      console.log("API Response Status:", response.status); // Debugging log

      if (response.ok) {
        const result = await response.json();
        console.log("API Response Data:", result); // Debugging log

        if (orderId) {
          // Update the order in the list
          setAddresses((prevAddresses) =>
            prevAddresses.map((addr) =>
              addr._id === orderId ? { ...addr, ...result.data } : addr
            )
          );
        } else {
          // Add new order to the list
          setAddresses((prevAddresses) => [...prevAddresses, result.data]);
        }

        alert(
          fabricProvidedByUser
            ? "Fabric charges set to 0. Order updated successfully!"
            : "Fabric charges set to 500. Order updated successfully!"
        );
      } else {
        console.error("Failed to update order");
        alert("Failed to update order. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order:", error); // Debugging log
      alert("An error occurred. Please try again.");
    } finally {
      console.log("Closing dialog and resetting loading state."); // Debugging log
      setIsLoading(false); // Hide loading indicator
      onClose(); // Close the dialog
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className="font-[700] font-poppins text-[12px]">
        Would you like to proceed with Fabric Selection?
      </DialogTitle>
      <div className="p-4">
        <Typography className="text-[12px] font-[400] font-poppins mb-4">
          Click ‘yes’ if you want to buy the fabric as well. Click ‘no’ if you
          already have the fabric which we’ll pick up during measurements.
        </Typography>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => handleChoice(false)}
            variant="contained"
            disabled={isLoading}
            className="text-[12px] text-white bg-[#C65647] font-[400] font-poppins"
          >
            {isLoading ? "Processing..." : "‘Yes’ I want to purchase the fabric"}
          </Button>
          <Button
            onClick={() => handleChoice(true)}
            variant="text"
            disabled={isLoading}
            className="text-[12px] text-[#1043F9] font-[400] font-poppins"
          >
            {isLoading
              ? "Processing..."
              : "‘No’, I already have the fabric"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default function FabricSelectionDialogDemo({ userId, orderId, setAddresses }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("Opening dialog"); // Debugging log
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Closing dialog"); // Debugging log
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Fabric Selection Dialog
      </Button>
      <FabricSelectionDialog
        open={open}
        onClose={handleClose}
        userId={userId}
        orderId={orderId}
        setAddresses={setAddresses}
      />
    </div>
  );
}

import React, { useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog className="bg-white" onClose={handleClose} open={open}>
      <DialogTitle className="font-[700] font-poppins text-[12px] ">
        Would you like to proceed with Fabric Selection?
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <p className="text-[12px] font-[400] font-poppins">
          Click ‘yes’ if you want to buy the cloth as well. Click ‘no’ if you
          already have the fabric which we’ll pick up during measurements.
        </p>
        <button className="px-4 py-2 text-[12px] text-white bg-[#C65647] font-[400] font-poppins">
          ‘Yes’ I want to purchase the fabric
        </button>
        <button className="px-4 py-2 text-[12px] text-[#1043F9] font-[400] font-poppins">
          ‘No’, I already have the fabric{" "}
        </button>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}