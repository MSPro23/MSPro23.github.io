import { Button, TextField } from "@material-ui/core";
import React from "react";

function EditAddress() {
  return (
    <div>
      <h2>Edit EditAddress</h2>
      <hr></hr>
      <TextField label="Address"></TextField>
      <TextField label="Pincode"></TextField>
      <TextField label="City"></TextField>
      <TextField label="State"></TextField>
      <TextField label="Country"></TextField>
      <hr></hr>
      <Button>Save</Button>
      <Button>Cancel</Button>
    </div>
  );
}

export default EditAddress;
