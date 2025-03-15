import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
       cart[index] = 0;    
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [searchQuery, setSearchQuery] = useState(""); // Added search state
    const [wishlist, setWishlist] = useState([]); // ✅ Wishlist state
    const [orderHistory, setOrderHistory] = useState([]); // ✅ Order history
    const navigate = useNavigate();

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
        
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

        // ✅ Add to wishlist
        const addToWishlist = (item) => {
            setWishlist((prev) => [...prev, item]);
        };
    
        // ✅ Remove from wishlist
        const removeFromWishlist = (itemId) => {
            setWishlist((prev) => prev.filter(item => item.id !== itemId));
        };
            // ✅ Place order
        const placeOrder = () => {
            setOrderHistory([...orderHistory, { date: new Date(), items: { ...cartItems } }]);
            setCartItems(getDefaultCart());
        };

    
    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        searchQuery,
        setSearchQuery, // Provide search state to all components
        navigate,
        addToWishlist,
        wishlist,
        removeFromWishlist,
        placeOrder,
        orderHistory
    };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;