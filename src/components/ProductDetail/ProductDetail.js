/**
 * @author Calvin Galbaw
 */

import { AppBar, Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ProductControlTab from "./ProductControlTab";
import ProductImageTab from "./ProductImageTab";
import Axios from "axios";
import useLoader from "../../hooks/useLoader";
/**
 *
 * @param {*} props
 *
 * @description this returns a single tab of the tabbed panel along with is children
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {
        /**
         * Here the body or contents of the tab are passed to the tab
         */
        value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )
      }
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/**
 *
 * @param match is the props passed by the react router
 */
function ProductDetail({ match }) {
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loader, showLoader, hideLoader] = useLoader();
  /**
   * @description This is to get the details of the product needed using the product id from the match parameter of react router
   */
  useEffect(() => {
    showLoader();
    Axios.get(
      `http://180.149.241.208:3022/getProductByProdId/${match.params.id}`
    )
      .then((res) => {
        // console.log(res);
        hideLoader();
        setDetails(res.data.product_details);
      })
      .catch((e) => {
        hideLoader();
      });
  }, []);
  // console.log(details);

  /**
   * @description This is the parent component of product detail page which holds the image tab and the control tab
   * It also has the tabbed panel for the features and description of the product
   *
   */
  return (
    <div style={{ margin: "80px auto 80px", width: "80%" }}>
      {details.length !== 0 && (
        <>
          <Row>
            <Col lg={6}>
              <ProductImageTab details={details[0]}></ProductImageTab>
            </Col>
            <Col>
              <ProductControlTab details={details[0]}></ProductControlTab>
            </Col>
          </Row>
          <Paper square>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Description" {...a11yProps(0)} />
              <Tab label="Features" {...a11yProps(1)} />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            {details[0].product_desc}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <b>Dimensions:</b> {details[0].product_dimension} (Width*Hieght in
            inc)
            <br></br>
            <b>Material:</b> {details[0].product_material}
            <br></br>
            <b>Manufacturer:</b> {details[0].product_producer}
          </TabPanel>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
