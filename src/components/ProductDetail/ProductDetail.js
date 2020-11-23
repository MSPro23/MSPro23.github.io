import { AppBar, Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ProductControlTab from "./ProductControlTab";
import ProductImageTab from "./ProductImageTab";
import Axios from "axios";
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function ProductDetail() {
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Axios.get(
      "http://180.149.241.208:3022/getProductByProdId/5d14cc6301ae103e6e94fbec"
    )
      .then((res) => {
        setDetails(res.data.product_details[0]);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, []);

  return (
    <div style={{ margin: "80px auto 80px", width: "80%" }}>
      <Row>
        <Col lg={6}>
          <ProductImageTab details={details}></ProductImageTab>
        </Col>
        <Col>
          <ProductControlTab details={details}></ProductControlTab>
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
        {details.product_desc}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Dimensions: {details.product_dimension} (Width*Hieght in inc)<br></br>
        Material: {details.product_material}
        <br></br>
        Manufacturer: {details.product_producer}
      </TabPanel>
    </div>
  );
}

export default ProductDetail;
