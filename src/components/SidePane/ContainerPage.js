/**
 * @author Calvin Galbaw
 */

import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import AddressCard from "../Address/AddressCard";
import AddressPage from "../Address/AddressPage";
import EditAddress from "../Address/EditAddress";
import EditPassword from "../EditPassword/EditPassword";
import OrderList from "../Order List/OrderList";
import ProfilePage from "../ProfilePage/ProfilePage";
import ProfileSidePane from "./ProfileSidePane";
import EditProfile from "../ProfilePage/EditProfile";
import AddAddress from "../Address/AddAddress";
import { Route, useHistory } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import { LoginContext, ToastContext } from "../../App";
import Axios from "axios";
import NoPage from "../NoPage";
import useLoader from "../../hooks/useLoader";
/**
 * @description It creates container and the side panel, and the coainter to load the tab
 * @param match is the props passed by the react router which contains the page value and id value
 */
function ContainerPage({ match }) {
  const page = match.params.page;
  const [selectedPage, setSelectedPage] = useState(""); //creates the state to manage the page
  const [open, setOpen] = useContext(ToastContext); //getting the login state and setState using hooks
  const history = useHistory(); //creates a useHistory hook to redirect page
  const [profileData, setProfileData] = useState(""); //Creates the state of the profile data
  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control

  /**
   * @description This is to get the details of the user which are shown in profile tab and for profile picture
   * and name
   * @returns sets the details and the profile pic of the user
   */
  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      history.push("/login");
      setOpen({ show: true, message: "You need to be logged in" });
    } else {
      showLoader();
      Axios.get("http://180.149.241.208:3022/getCustProfile", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          hideLoader();
          setProfileData(res.data.customer_proile);
        })
        .catch((e) => {
          hideLoader();
          console.log(e.response);
        });
    }
  }, []);
  /**
   * @description to set the page needed by the user according to the match
   * @return sets the selected page to the value of page
   */
  useEffect(() => {
    if (
      page == "orders" ||
      page == "editPassword" ||
      page == "editAddress" ||
      page == "profile" ||
      page == "editProfile" ||
      page == "addAddress" ||
      page == "address" ||
      page == ""
    )
      setSelectedPage(page);
    else setSelectedPage("error");
  }, [page]);
  /**
   * @description This holds all both the side panel of profile along with the sub pages such as orders, profile, address, etc
   * Each sub page is routed using switch and routes whose previous switch is passed from the app.js file
   * The list contained one of the path which now is directed to the desired sub page and it is rendered
   */
  return profileData !== "" ? (
    <div style={{ margin: "30px auto 100px" }} className="paperProfile">
      <h2>My Account</h2>
      <hr></hr>
      <Row>
        <Col lg={4} sm={12}>
          <ProfileSidePane
            profileData={profileData}
            setProfileData={setProfileData}
          ></ProfileSidePane>
        </Col>
        <Col lg={8} sm={12}>
          {selectedPage == "orders" && <OrderList />}
          {selectedPage == "profile" && (
            <ProfilePage profileData={profileData} />
          )}
          {selectedPage == "editProfile" && (
            <EditProfile
              setProfileData={setProfileData}
              profileData={profileData}
            />
          )}
          {selectedPage == "addAddress" && <AddAddress />}
          {selectedPage == "address" && <AddressPage />}
          {selectedPage == "editAddress" && <EditAddress match={match} />}
          {selectedPage == "editPassword" && <EditPassword />}
          {selectedPage == "error" && <NoPage />}
        </Col>
      </Row>
      {loader}
    </div>
  ) : (
    <>
      <div style={{ textAlign: "center", margin: "200px 0" }}>
        <h1>Please Wait for your details to load</h1>
      </div>
      {loader}
    </>
  );
}

export default ContainerPage;
