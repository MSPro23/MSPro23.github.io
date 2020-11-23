import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
function EditProfile() {
  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <h2>Edit Profile</h2>
      <hr></hr>
      <TextField label="First Name"></TextField>
      <TextField label="Last Name"></TextField>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row aria-label="gender" name="gender1">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
      <TextField label="Date of Birth"></TextField>
      <TextField label="Mobile"></TextField>
      <TextField label="Email"></TextField>
      <TextField type="file"></TextField>
      <hr></hr>
      <Button>Save</Button>&nsbp;&nsbp;<Button>Cancel</Button>
    </Paper>
  );
}

export default EditProfile;
