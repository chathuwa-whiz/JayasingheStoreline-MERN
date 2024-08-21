import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    itemsPriceSum: 0,
    totalDiscount: 0,
    deliveryPrice: 0,
    totalPriceSum: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
    
      // Calculate the new product price with discount
      const newProductPrice = parseFloat((item.sellingPrice - (item.sellingPrice * item.discount) / 100).toFixed(2));
    
      const existItem = state.cartItems.find((x) => x._id === item._id);
    
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...item, newProductPrice } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, newProductPrice }];
      }

      // Calculate itemsPriceSum, totalDiscount, and totalPriceSum
      const { itemsPriceSum, totalDiscount } = state.cartItems.reduce((acc, item) => {
        const itemTotal = item.newProductPrice * item.qty;
        const itemDiscount = (item.sellingPrice * item.discount) / 100 * item.qty;
        
        return {
          itemsPriceSum: acc.itemsPriceSum + itemTotal,
          totalDiscount: acc.totalDiscount + itemDiscount,
        };
      }, {
        itemsPriceSum: 0,
        totalDiscount: 0,
      });
    
      // Set shipping price (if applicable, otherwise set to a default value or 0)
      const shippingPrice = 0; // Change this as needed, e.g., state.shippingPrice or a default value

      // Set deliveryPrice (e.g., a fixed amount or based on conditions)
      const deliveryPrice = 10; // Update this value as needed (e.g., state.deliveryPrice or a default value)
    
      // Calculate totalPriceSum
      const totalPriceSum = parseFloat((itemsPriceSum - totalDiscount + deliveryPrice).toFixed(2));
    
      // Update state with new values
      state.itemsPriceSum = parseFloat(itemsPriceSum.toFixed(2));
      state.totalDiscount = parseFloat(totalDiscount.toFixed(2));
      state.shippingPrice = parseFloat(shippingPrice.toFixed(2));
      state.totalPriceSum = totalPriceSum;
    
      // Update the state with the new cart items and return the updated state
      return updateCart(state, state.cartItems);
    },    

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
