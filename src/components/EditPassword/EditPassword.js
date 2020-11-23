import { Button, Divider, Grid, TextField } from "@material-ui/core";
import React from "react";
import "../../css/ProfileSidePane.css";
function EditPassword() {
  return (
    <div className="editPasswordInput">
      <Grid container alignItems="center" justify="center" direction="column">
        <h2>Change Password</h2>
        <Divider></Divider>
        <p>NOTE : Password must be : 8-12 Alphanumeric characters</p>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          className="inputandbutton"
          label="Old Password"
        ></TextField>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          className="inputandbutton"
          label="New Password"
        ></TextField>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          className="inputandbutton"
          label="Confirm Password"
        ></TextField>
        <Button color="primary" variant="contained" className="inputandbutton">
          Submit
        </Button>
      </Grid>
    </div>
  );
}

export default EditPassword;
