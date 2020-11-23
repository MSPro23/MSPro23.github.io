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

function ProductSidePanel({ filter, setFilter }) {
  const [allCategory, setAllCategory] = useState([]);
  const [allColor, setAllColor] = useState([]);

  useEffect(() => {
    Axios.get("http://180.149.241.208:3022/getAllCategories")
      .then((res) => {
        setAllCategory(res.data.category_details);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://180.149.241.208:3022/getAllColors")
      .then((res) => {
        setAllColor(res.data.color_details);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

  const onCategorySelect = (i) => {
    setFilter({
      ...filter,
      pageNo: 1,
      perPage: 8,
      category_id: i,
      color_id: "",
      sortBy: "",
      sortIn: "",
    });
  };

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

  const onAllProductsClick = () => {
    setFilter({
      category_id: "",
      color_id: "",
      sortBy: "",
      sortIn: "",
      pageNo: 1,
      perPage: 8,
    });
  };

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
            {allCategory.map((category) => {
              return (
                <>
                  <ListItem
                    button
                    onClick={() => onCategorySelect(category.category_id)}
                  >
                    <ListItemText primary={category.category_name} />
                  </ListItem>
                  <Divider></Divider>
                </>
              );
            })}
          </List>
        </Collapse>
      </List>

      <List className="sidePaneElement filterList">
        <ListItem button onClick={onColorListHandler}>
          <ListItemText primary="Color" />
          {open.category ? <ExpandLess /> : <ExpandMore />}
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
                {allColor.map((color) => {
                  return (
                    <Grid item lg={4}>
                      <Tooltip title={color.color_name}>
                        <Button
                          onClick={() => onColorSelect(color.color_id)}
                          style={{
                            backgroundColor: color.color_code,
                            width: "40px",
                            padding: "0",
                            height: "25px",
                            border: "1px solid #000",
                            outlineColor: "#000",
                            borderRadius: "5px",
                          }}
                        ></Button>
                      </Tooltip>
                    </Grid>
                  );
                })}
              </Grid>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Grid>
  );
}

export default ProductSidePanel;
