// cartslice.js
import { createSlice } from '@reduxjs/toolkit';



const updateLocalStorage = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity, size } = action.payload;
            const cart = state;
            const index = cart.findIndex(
                (item) => item.id == product.id && item.size == size
            )
            if(index == -1) {
                cart.push({...product,quantity,size})
            }else{
                cart[index].quantity = Number(cart[index].quantity) + Number(quantity);
            }
            state = cart;
            return state;

        },
        
        updateItem: (state, actions) =>{
            const {product,quantity,size} = actions.payload
            const cart = state
            const index = cart.findIndex(
                (item) => item.id ==product.id&&item.size==size
            );
            cart[index].quantity=Math.max(1, quantity);
            return cart;
        },

        removeItem:(state,actions)=>{
            const {product,size} = actions.payload
            const cart = state
            const index = cart.findIndex(
                (item) => item.id ==product.id&&item.size==size
            );
            cart.splice(index,1)
        },
        removeCart:(state) => (state=[]),
    },
});

export const { addToCart, removeItem, removeCart , updateItem} = cartSlice.actions;

export default cartSlice.reducer;

