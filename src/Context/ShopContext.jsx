import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Components/FirebaseAuth/firebase";
import { collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../Components/FirebaseAuth/firebase"; // Firebase authentication
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // ✅ Fetch cart from localStorage & Firestore when the app loads
    useEffect(() => {
        const fetchCart = async () => {
            // ✅ Check if cart exists in localStorage
            const localCart = localStorage.getItem("cartItems");
            if (localCart) {
                setCartItems(JSON.parse(localCart));
            }

            // ✅ Fetch cart from Firestore if user is logged in
            const user = auth.currentUser;
            if (user) {
                const cartRef = doc(db, "carts", user.uid);
                const cartSnap = await getDoc(cartRef);

                if (cartSnap.exists()) {
                    const firestoreCart = cartSnap.data().items.reduce((acc, item) => {
                        acc[item.id] = item.quantity;
                        return acc;
                    }, {});

                    // ✅ Merge Firestore cart with local cart (if any)
                    setCartItems((prevCart) => ({ ...prevCart, ...firestoreCart }));
                }
            }
        };
        fetchCart();
    }, []);

    // ✅ Save cart to Firestore & localStorage
    const saveCartToFirestore = async (newCart) => {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not logged in!");
            return;
        }

        const cartRef = doc(db, "carts", user.uid);
        const cartData = Object.keys(newCart).map((itemId) => {
            const product = all_product.find((item) => item.id === Number(itemId));
            return product ? {
                id: product.id,
                name: product.name,
                price: product.new_price,
                quantity: newCart[itemId],
                total: product.new_price * newCart[itemId],
            } : null;
        }).filter(Boolean);

        try {
            await setDoc(cartRef, { items: cartData });
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };

    // ✅ Add to cart (updates Firestore & localStorage)
    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };

            // ✅ Save to localStorage
            localStorage.setItem("cartItems", JSON.stringify(newCart));

            saveCartToFirestore(newCart);
            return newCart;
        });
    };

    // ✅ Remove from cart (updates Firestore & localStorage)
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }

            // ✅ Save to localStorage
            localStorage.setItem("cartItems", JSON.stringify(newCart));

            saveCartToFirestore(newCart);
            return newCart;
        });
    };

    // ✅ Get total cart items
    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
    };

    // ✅ Calculate total cart amount
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const product = all_product.find((item) => item.id === Number(itemId));
            return product ? total + (product.new_price * cartItems[itemId]) : total;
        }, 0);
    };

    // ✅ Add to wishlist
    const addToWishlist = (item) => {
        setWishlist((prev) => [...prev, item]);
    };

    // ✅ Remove from wishlist
    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => prev.filter(item => item.id !== itemId));
    };

    // ✅ Place Order (Save Order in Firestore)
    const placeOrder = async (deliveryInfo, paymentMethod) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("Please login to place an order!");
                return;
            }

            const orderData = {
                userId: user.uid,
                items: Object.keys(cartItems).map((itemId) => {
                    const product = all_product.find((item) => item.id === Number(itemId));
                    return product ? {
                        id: product.id,
                        name: product.name,
                        price: product.new_price,
                        quantity: cartItems[itemId],
                        total: product.new_price * cartItems[itemId],
                    } : null;
                }).filter(Boolean),
                totalAmount: getTotalCartAmount() + 10, // Including shipping fee
                paymentMethod,
                deliveryInfo,
                timestamp: serverTimestamp(),
            };

            await addDoc(collection(db, "orders"), orderData);
            alert("Order placed successfully!");

            // ✅ Clear cart after order
            setCartItems({});
            localStorage.removeItem("cartItems"); // ✅ Clear localStorage
            saveCartToFirestore({});
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Try again.");
        }
    };

    // ✅ Fetch order history from Firestore
    useEffect(() => {
        const fetchOrderHistory = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const ordersRef = collection(db, "orders");
            const ordersSnapshot = await getDoc(doc(ordersRef, user.uid));

            if (ordersSnapshot.exists()) {
                setOrderHistory(ordersSnapshot.data().orders || []);
            }
        };
        fetchOrderHistory();
    }, []);

    return (
        <ShopContext.Provider value={{
            getTotalCartItems,
            getTotalCartAmount,
            all_product,
            cartItems,
            addToCart,
            removeFromCart,
            searchQuery,
            setSearchQuery,
            navigate,
            addToWishlist,
            wishlist,
            removeFromWishlist,
            placeOrder,
            orderHistory,
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
