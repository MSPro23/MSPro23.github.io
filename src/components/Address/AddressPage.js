import { Button, Paper } from "@material-ui/core";
import React from "react";
import AddressCard from "./AddressCard";

function AddressPage() {
  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <h2>Address</h2>
      <hr></hr>
      <AddressCard></AddressCard>
      <hr></hr>
      <Button
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        }}
      >
        Add Address
      </Button>
    </Paper>
  );
}

export default AddressPage;
