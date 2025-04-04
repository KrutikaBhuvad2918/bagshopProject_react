import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';
import { db } from '../FirebaseAuth/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();

    // ✅ Checkout function
    const handleCheckout = async () => {
        try {
            const cartData = Object.keys(cartItems)
                .map((itemId) => {
                    const product = all_product.find((e) => e.id === Number(itemId));
                    if (!product) return null;
    
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.new_price,
                        quantity: cartItems[itemId],
                        total: product.new_price * cartItems[itemId],
                    };
                })
                .filter(Boolean); // Remove null values
    
            if (cartData.length === 0) {
                alert("Your cart is empty!");
                return;
            }
    
            // ✅ Save order to Firestore
            await addDoc(collection(db, 'orders'), {
                items: cartData,
                timestamp: serverTimestamp(),
            });
    
            // ✅ Show alert before navigation
            // alert("Order placed successfully!");
    
            // ✅ Navigate after alert confirmation
            navigate('/place-order');
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Something went wrong! Please try again.");
        }
    };
    

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {Object.keys(cartItems).map((itemId) => {
                const product = all_product.find((e) => e.id === Number(itemId));
                if (!product) return null;

                return (
                    <div key={product.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img className='carticon-product-icon' src={product.image} alt={product.name} />
                            <p>{product.name}</p>
                            <p>₹{product.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[itemId]}</button>
                            <p>₹{product.new_price * cartItems[itemId]}</p>
                            <img className='cartitems-remove-icon' onClick={() => removeFromCart(product.id)} src={remove_icon} alt="Remove" />
                        </div>
                        <hr />
                    </div>
                );
            })}

            <div className="cartitems-down">
                <div className="cartitems-totals">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                {/* <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button>Submit</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CartItems;
