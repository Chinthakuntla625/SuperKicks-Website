import {configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './Cartslice';


const Store = configureStore({
        reducer:{
            cart:cartSliceReducer,
        },
      });
   
export default Store;
