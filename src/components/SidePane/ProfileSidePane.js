/**
 * @author Calvin Galbaw
 */

import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import "../../css/ProfileSidePane.css";
import Button from "@material-ui/core/Button";
import SubjectIcon from "@material-ui/icons/Subject";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { useHistory } from "react-router-dom";
/**
 * @description This is a functional component used to create the profile side panel for navigation
 * @param profileData is a parent state containing of object having details of the user
 * @param setProfileData is a drilled down setState function to change the state of profileData
 * @returns JSX containing the panel with buttons for navigation
 */
function ProfileSidePane({ profileData, setProfileData }) {
  const history = useHistory(); //creates a useHistory hook to redirect page
  const profileimg =
    "http://180.149.241.208:3023/assets/images/profile-placeholder.png";
  /**
   * @description Its used to set the profile pic of user according to the availability of it
   * @returns sets the profileData with appropriate picture of the user
   */
  useEffect(() => {
    setProfileData({
      ...profileData,
      profile_img: profileData.profile_img
        ? `http://180.149.241.208:3022/${profileData.profile_img}`
        : //Update the profile picture according to the image availability
          profileimg,
    });
  }, []);
  /**
   * @description Material UI components such as Grid and Buttons are used to create the page
   */
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <img
        className="profilePic"
        src={profileData.profile_img}
        alt="Profile"
      ></img>
      <span className="userName">
        {profileData.first_name + " " + profileData.last_name}
      </span>
      {/**
       * These buttons are used to get the required sub Page using useHistory hook
       * Each subpage will render except the side panel and cointainer similar to header and footer
       */}
      <Button
        className="sidePaneButtons"
        onClick={() => history.push("/MyAccount/orders")}
        startIcon={<SubjectIcon />}
        color="primary"
      >
        Order
      </Button>
      <Button
        className="sidePaneButtons"
        onClick={() => history.push("/MyAccount/profile")}
        startIcon={<AccountBoxIcon />}
        color="primary"
      >
        Profile
      </Button>
      <Button
        className="sidePaneButtons"
        onClick={() => history.push("/MyAccount/address")}
        startIcon={<HomeIcon />}
        color="primary"
      >
        Address
      </Button>
      <Button
        className="sidePaneButtons"
        onClick={() => history.push("/MyAccount/editPassword")}
        startIcon={<CompareArrowsIcon />}
        color="primary"
      >
        Change Password
      </Button>
    </Grid>
  );
}

export default ProfileSidePane;
