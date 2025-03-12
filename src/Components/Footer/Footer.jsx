import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import paymentImg from "../Assets/payment-option.png"; // Import your payment image 
// import { SiVisa, SiMastercard, SiAmericanexpress, SiPaypal, SiDiscover } from "react-icons/si";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Shop Section */}
        <div className="footer-section">
          <h3>SHOP</h3>
          <ul>
            <li><a href="#">A/W 24</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Bestsellers</a></li>
            <li><a href="#">Under 1999</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-section">
          <h3>CUSTOMER CARE</h3>
          <ul>
            <li><a href="#">Track My Order</a></li>
            <li><a href="#">Return & Exchange</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms Of Service</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Know Us */}
        <div className="footer-section">
          <h3>KNOW US</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Product Care</a></li>
            <li><a href="#">Corporate Gifting</a></li>
            <li><a href="#">Miraggio Muse</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section-newsletter">
          <h3>NEWSLETTER</h3>
          <p >Subscribe to get notified about product launches, special offers, and company news.</p>
          <div className="news-input">
            <input type="email" placeholder="E-mail" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="currency-selector">
          <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" className="flag" />
          <span>INDIA (INR ₹)</span>
        </div>
        <p>© 2025 - POWERED BY SHOPIFY</p>
        <div className="payment-img">
          <img src={paymentImg} alt="" />
        </div>
        {/* <div className="payment-icons">
          <SiVisa />
          <SiMastercard />
          <SiAmericanexpress />
          <SiPaypal />
          <SiDiscover /> 
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
