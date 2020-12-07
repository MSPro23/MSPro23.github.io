/**
 * @author Calvin Galbaw
 */

import {
  Grid,
  ListItem,
  List,
  ListItemText,
  Collapse,
  Divider,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Axios from "axios";
import "../../css/Products.css";
import { useHistory } from "react-router-dom";

function ProductSidePanel({ filter, setFilter }) {
  const [allCategory, setAllCategory] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const history = useHistory();
  /**
   * @description To get all categories of the products to be displayed as list in the component
   */
  useEffect(() => {
    Axios.get("http://180.149.241.208:3022/getAllCategories")
      .then((res) => {
        setAllCategory(res.data.category_details);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, []);
  /**
   * @description To get all colors of the products to be displayed as list in the component
   */
  useEffect(() => {
    Axios.get("http://180.149.241.208:3022/getAllColors")
      .then((res) => {
        setAllColor(res.data.color_details);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  /**
   * @description This constrols the dropdown status of the dropdown list for category and color filter
   */
  const [open, setOpen] = React.useState({
    category: false,
    color: false,
  });

  const onCategoryListHandler = () => {
    setOpen({
      ...open,
      color: false,
      category: !open.category,
    });
  };

  const onColorListHandler = () => {
    setOpen({
      ...open,
      color: !open.color,
      category: false,
    });
  };
  /**
   * @description This sets the filter to the category selected by the user and resets the pagination
   */
  const onCategorySelect = (i) => {
    setFilter({
      ...filter,
      pageNo: 1,
      perPage: 8,
      category_id: i,
      color_id: "",
      sortBy: "",
      name: "",
      sortIn: "",
    });
    history.push(`/products/${i}`);
  };
  /**
   * @description This sets the filter to the color selected by the user and resets the pagination
   */
  const onColorSelect = (i) => {
    setFilter({
      ...filter,
      pageNo: 1,
      perPage: 8,
      color_id: i,
      sortBy: "",
      sortIn: "",
    });
  };
  /**
   * @description Resets the complete filter to fetch all products
   */
  const onAllProductsClick = () => {
    setFilter({
      category_id: "",
      name: "",
      color_id: "",
      sortBy: "",
      sortIn: "",
      pageNo: 1,
      perPage: 8,
    });
    history.push("/products");
  };
  /**
   * @description This component is the side panel which contains the get all products button and, category and color filter
   */
  return (
    <Grid container justify="center" direction="column" alignContent="center">
      <Button
        className="sidePaneElement"
        style={{ backgroundColor: "white", color: "black" }}
        onClick={onAllProductsClick}
      >
        All Products
      </Button>
      <List
        className="sidePaneElement filterList"
        style={{ marginTop: "30px" }}
      >
        <ListItem button onClick={onCategoryListHandler}>
          <ListItemText primary="Category" />
          {open.category ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.category} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              /**
               * Map through all the categories to create a list
               */
              allCategory.map((category) => {
                return (
                  <React.Fragment key={category.category_id}>
                    <ListItem
                      button
                      selected={category.category_id == filter.category_id}
                      onClick={() => onCategorySelect(category.category_id)}
                    >
                      <ListItemText primary={category.category_name} />
                    </ListItem>
                    <Divider></Divider>
                  </React.Fragment>
                );
              })
            }
          </List>
        </Collapse>
      </List>

      <List className="sidePaneElement filterList">
        <ListItem button onClick={onColorListHandler}>
          <ListItemText primary="Color" />
          {open.color ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.color} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                {
                  /**
                   * Map through all the colors to create a list
                   */
                  allColor.map((color) => {
                    return (
                      <Grid item lg={4} key={color.color_id}>
                        <Tooltip title={color.color_name}>
                          <Button
                            onClick={() => onColorSelect(color.color_id)}
                            style={{
                              backgroundColor: color.color_code,
                              width: "40px",
                              padding: "0",
                              height: "25px",
                              border:
                                color.color_id === filter.color_id
                                  ? "4px solid #000"
                                  : "1px solid #000",
                              outlineColor: "#000",
                              borderRadius: "5px",
                            }}
                          ></Button>
                        </Tooltip>
                      </Grid>
                    );
                  })
                }
              </Grid>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Grid>
  );
}

export default ProductSidePanel;
