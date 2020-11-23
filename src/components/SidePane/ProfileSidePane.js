import { Grid } from "@material-ui/core";
import React from "react";
import "../../css/ProfileSidePane.css";
import Button from "react-bootstrap/esm/Button";
function ProfileSidePane(props) {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <img
        className="profilePic"
        src="http://180.149.241.208:3022/2020-11-22T14-58-43.993Zblog_image_3.jpg"
      ></img>
      <span className="userName">Cal Gal</span>
      <Button className="sidePaneButtons">Order</Button>
      <Button className="sidePaneButtons">Profile</Button>
      <Button className="sidePaneButtons">Address</Button>
      <Button className="sidePaneButtons">Change Password</Button>
    </Grid>
  );
}

export default ProfileSidePane;
