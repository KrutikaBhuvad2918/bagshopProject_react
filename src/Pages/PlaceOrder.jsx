import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PlaceOrder.css';
import stripeLogo from '../Components/Assets/Stripe-Logo.png';
import razorpayLogo from '../Components/Assets/Razerpay-Logo.jpg';
import { ShopContext } from '../Context/ShopContext';

const PlaceOrder = () => {
    const { getTotalCartAmount , cartItems, all_product} = useContext(ShopContext);
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('cod');

    const handleOrder = () => {
        alert('Order placed successfully!');
        navigate('/');
    };

    return (
        <div className='place-order-container'>
            <div className='order-form-container'>
                <h2>DELIVERY <span>INFORMATION</span></h2>
                <form>
                    <div className='input-row'>
                        <input type='text' placeholder='First name' required />
                        <input type='text' placeholder='Last name' required />
                    </div>
                    <input type='email' placeholder='Email address' required />
                    <input type='text' placeholder='Street' required />
                    <div className='input-row'>
                        <input type='text' placeholder='City' required />
                        <input type='text' placeholder='State' required />
                    </div>
                    <div className='input-row'>
                        <input type='text' placeholder='Zipcode' required />
                        <input type='text' placeholder='Country' required />
                    </div>
                    <input type='text' placeholder='Phone' required />
                </form>
            </div>
            
            <div className='order-summary-container'>
                <h2>CART <span>TOTALS</span></h2>

                <div className='order-summary1'>
                    <h2>Order Summary</h2>
                    {all_product.map((item) => {
                        if (cartItems[item.id] > 0) {
                            return (
                                <div className='order-item' key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name} x {cartItems[item.id]}</p>
                                    <p>₹{item.new_price * cartItems[item.id]}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <h3>Total  : ₹{getTotalCartAmount()}</h3>
                    
                </div>
                <div className='order-summary'>
                    <p>Subtotal <span>₹ {getTotalCartAmount()}</span></p>
                    <p>Shipping Fee <span>₹ 10.00</span></p>
                    <hr />
                    <h3>Total <span>₹ {getTotalCartAmount() + 10}</span></h3>
                </div>
                
                <h3>PAYMENT METHOD</h3>
                <div className='payment-options'>
                    <label className={`payment-option ${selectedPayment === 'stripe' ? 'selected' : ''}`} onClick={() => setSelectedPayment('stripe')}>
                        <input type='radio' name='payment' value='stripe' checked={selectedPayment === 'stripe'} readOnly />
                        <img src={stripeLogo} alt='Stripe' />
                    </label>
                    <label className={`payment-option ${selectedPayment === 'razorpay' ? 'selected' : ''}`} onClick={() => setSelectedPayment('razorpay')}>
                        <input type='radio' name='payment' value='razorpay' checked={selectedPayment === 'razorpay'} readOnly />
                        <img src={razorpayLogo} alt='Razorpay' />
                    </label>
                    <label className={`payment-option cod-option ${selectedPayment === 'cod' ? 'selected' : ''}`} onClick={() => setSelectedPayment('cod')}>
                        <input type='radio' name='payment' value='cod' checked={selectedPayment === 'cod'} readOnly /> Cash on Delivery
                    </label>
                </div>
                <button className='place-order-btn' onClick={handleOrder}>PLACE ORDER</button>
            </div>
        </div>
    );
};

export default PlaceOrder;
