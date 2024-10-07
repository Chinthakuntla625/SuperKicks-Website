import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartItem {
  id: string;
  price: number;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  totalPrice: JSON.parse(localStorage.getItem('totalPrice') || '0'),
  count: JSON.parse(localStorage.getItem('cartCount') || '0'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.count += 1;
      state.totalPrice += item.price;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
      localStorage.setItem('cartCount', JSON.stringify(state.count));
    },


    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
        }

        state.count -= 1;
        state.totalPrice -= existingItem.price;

        localStorage.setItem('cartItems', JSON.stringify(state.items));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        localStorage.setItem('cartCount', JSON.stringify(state.count));
      }
    },


    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalPrice');
      localStorage.removeItem('cartCount');
    },


    addItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i.id === itemId);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        state.totalPrice += existingItem.price;
        state.count += 1;

        localStorage.setItem('cartItems', JSON.stringify(state.items));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        localStorage.setItem('cartCount', JSON.stringify(state.count));
      }
    },

    
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i.id === itemId);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) - 1;
        state.totalPrice -= existingItem.price;
        state.count -= 1;

        if (existingItem.quantity && existingItem.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== itemId);
        }

        localStorage.setItem('cartItems', JSON.stringify(state.items));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        localStorage.setItem('cartCount', JSON.stringify(state.count));
      }
    },
    
    // addToWish: (state, action: PayloadAction<CartItem>) => {
    //     const item = action.payload;
    //     const existingItem = state.wishitems.find(i => i.id === item.id);
    //     if (!existingItem) {
    //         state.wishitems.push({ ...item, quantity: 1 });
    //         // state.wishcount += 1;
    //     }
    //     localStorage.setItem('wishItems', JSON.stringify(state.wishitems));
    //     // localStorage.setItem('wishCount', JSON.stringify(state.wishcount));
    // }
  }
});

export const { addToCart, removeFromCart, clearCart, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
















