import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import checkoutSlice from "./checkoutSlice";
import orderSlice from "./orderSlice";
import filterSlice from "./filterSlice";

const mystore = configureStore({
    reducer:{
        cart:cartSlice.reducer,
        product:productSlice.reducer,
        user:userSlice.reducer,
        category:categorySlice.reducer,
        checkout:checkoutSlice.reducer,
        order:orderSlice.reducer,
        filter:filterSlice.reducer
    }
})
export default mystore