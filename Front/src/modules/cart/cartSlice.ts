// redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productNo: number;
  accountNo: number;
  productName: string;
  productPrice: number;
  productImg: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const loadState = (): CartState => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { cartItems: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { cartItems: [] };
  }
};

const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState: CartState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productNo === action.payload.productNo
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      saveState(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productNo !== action.payload
      );
      saveState(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productNo: Number; quantity: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.productNo === action.payload.productNo
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveState(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveState(state);
    },
    // 추가적인 액션들
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
// export default cartSlice.reducer;
