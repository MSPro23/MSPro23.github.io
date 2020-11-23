import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import "../../css/ProfileSidePane.css";
function AddressCard() {
  return (
    <Paper elevation={2} style={{ padding: "15px" }}>
      <span>hhhhhhhhhhh</span>
      <Button className="deleteAddressButton">X</Button>
      <br></br>
      <span>dsdsds</span>
      <br></br>
      <span>fdddsdsa</span>
      <br></br>
      <br></br>
      <Button variant="contained" color="primary">
        Edit
      </Button>
    </Paper>
  );
}

export default AddressCard;
