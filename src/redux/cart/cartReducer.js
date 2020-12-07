/**
 * @author Calvin Galbaw
 */

import {
  ADD_PRODUCTTO_CART,
  ADD_QUANTITY_CART,
  REMOVE_QUANTITY_CART,
  REMOVE_PRODUCTFROM_CART,
  CART_DETAILS_SUCCESS,
  RESTORE_CART,
  LOGOUT_CART,
} from "./cartType.js";

const initialCartDetails = {
  items: [],
  message: "",
  total_cost: 0,
};

/**
 *
 * @param {intialCartDetails} state
 * @param {*} action
 *
 * @description This is used to reduce the state according to the action dispatched
 */
export const cartDetailReducer = (state = initialCartDetails, action) => {
  switch (action.type) {
    /**
     * For adding a product, append to the current state the action payload and add the cost to the current total cost
     * Check if the product is already present or not before appending
     */
    case ADD_PRODUCTTO_CART:
      const bool = state.items.some((item) => {
        return item.product_id === action.payload.product_id;
      });
      if (!bool) {
        const final = {
          ...action.payload,
          quantity: 1,
          total: action.payload.product_cost,
        };
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...state,
            items: [...state.items, final],
            message: "",
            success: false,
            total_cost:
              parseInt(state.total_cost) + parseInt(final.product_cost),
          })
        );
        return {
          ...state,
          items: [...state.items, final],
          message: "Added to the cart",
          total_cost: parseInt(state.total_cost) + parseInt(final.product_cost),
        };
      } else {
        return {
          ...state,
          message: "Product Already added in the cart",
        };
      }
    /**
     * For removing a product, use filter with a proper return condition such that only the required array is returned
     *  and subtract the cost to the current total cost
     */
    case REMOVE_PRODUCTFROM_CART:
      const total_quantity = parseInt(action.payload.quantity);
      const cost = parseInt(action.payload.product_cost);
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          success: false,
          items: state.items.filter(
            (x) => x.product_id !== action.payload.product_id
          ),
          total_cost: parseInt(state.total_cost) - total_quantity * cost,
          message: "product removed",
        })
      );
      return {
        ...state,
        items: state.items.filter(
          (x) => x.product_id !== action.payload.product_id
        ),
        total_cost: parseInt(state.total_cost) - total_quantity * cost,
        message: "product removed",
      };

    /**
     * For decreasing the product, decrement the quantity attribute from the product by searching the product using filter
     * or map and check if the quantity is 1 to avoid 0 or negative values in quantity
     * update the total cost accordingly
     */
    case REMOVE_QUANTITY_CART:
      const cost1 = parseInt(action.payload.product_cost);
      if (action.payload.quantity === 1) {
        return {
          ...state,
        };
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...state,
            success: false,
            items: state.items.map((x) => {
              return x.product_id === action.payload.product_id
                ? {
                    ...x,
                    quantity: x.quantity - 1,
                    message: "quantitiy removed",
                  }
                : {
                    ...x,
                  };
            }),
            total_cost: state.total_cost - cost1,
          })
        );
        return {
          ...state,
          items: state.items.map((x) => {
            return x.product_id === action.payload.product_id
              ? {
                  ...x,
                  quantity: x.quantity - 1,
                  message: "quantitiy removed",
                }
              : {
                  ...x,
                };
          }),
          total_cost: state.total_cost - cost1,
        };
      }
    /**
     * For increasing the product, increment the quantity attribute from the product by searching the product using filter
     * or map and check if the quantity is 9 to limit the quantity of product
     * update the total cost accordingly
     */
    case ADD_QUANTITY_CART:
      const cost2 = parseInt(action.payload.product_cost);
      if (action.payload.quantity === 9) {
        return {
          ...state,
          message: "Not more than 9 items allowed",
          success: true,
        };
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...state,
            items: state.items.map((x) => {
              return x.product_id === action.payload.product_id
                ? {
                    ...x,
                    quantity: x.quantity + 1,
                  }
                : {
                    ...x,
                  };
            }),
            total_cost: state.total_cost + cost2,
            message: "added quantity",
            success: false,
          })
        );
        return {
          ...state,
          items: state.items.map((x) => {
            return x.product_id === action.payload.product_id
              ? {
                  ...x,
                  quantity: x.quantity + 1,
                }
              : {
                  ...x,
                };
          }),
          total_cost: state.total_cost + cost2,
          message: "added quantity",
          success: true,
        };
      }
    /**
     * After getting the cart details from the get call, the products are checked using map and some to check if the product
     * is present in the current cart. If it is present the product is not added to the cart again else the product is
     * filtered out and is appended to the cart state along with the updated total cost to maintain both the stored cart and
     * the api call cart
     */
    case CART_DETAILS_SUCCESS:
      if (state.items.length === 0) {
        // console.log(action.payload.product_details);
        const data_items = action.payload.product_details.map((product) => {
          return {
            ...product.product_id,
            quantity: parseInt(product.quantity),
          };
        });
        console.log(data_items);
        let total5 = 0;
        for (let i of data_items) {
          total5 = total5 + parseInt(i.quantity) * parseInt(i.product_cost);
        }
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...state,
            items: data_items,
            total_cost: total5,
            success: false,
          })
        );
        return {
          ...state,
          items: data_items,
          total_cost: total5,
        };
      } else {
        let data_items = action.payload.product_details.map((product) => {
          return {
            ...product.product_id,
            quantity: parseInt(product.quantity),
          };
        });

        data_items = data_items.filter((data) => {
          return !state.items.some((item) => {
            return item.product_id === data.product_id;
          });
        });
        let total5 = 0;
        for (let i of data_items) {
          total5 = total5 + parseInt(i.quantity) * parseInt(i.product_cost);
        }
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...state,
            items: [...data_items, ...state.items],
            total_cost: total5 + state.total_cost,
            success: false,
          })
        );
        return {
          ...state,
          items: [...state.items, ...data_items],
          total_cost: state.total_cost + total5,
        };
      }
    /**
     * This resets the cart to initial state
     */
    case RESTORE_CART:
      if (localStorage.getItem("cart") != undefined) {
        return JSON.parse(localStorage.getItem("cart"));
      } else {
        return { ...state };
      }
    /**
     * This resets the cart after updating the cart in the initial state
     */
    case LOGOUT_CART:
      return {
        items: [],
        message: "",
        total_cost: 0,
      };
    default:
      return {
        ...state,
      };
  }
};
