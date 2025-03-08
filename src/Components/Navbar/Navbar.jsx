import React, { useContext, useState } from 'react';
import './Navbar.css';
import Cartlogo from '../Assets/cartlogo.png';
import SearchIcon from '../Assets/search.jpg';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [showSearch, setShowSearch] = useState(false); 
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src='' alt='' />
        <p>BAGSHOP</p>
      </div>

      {/* Search bar container (will overlap menu when visible) */}
      {showSearch && (
        <div className='overlay-search-bar'>
          <input 
            type="text" 
            className='search-bar' 
            placeholder="Search bags..." 
          />
        </div>
      )}

      <ul className='nav-menu'>
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("mens")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/mens'>Clutches</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("womens")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/womens'>Purses</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/kids'>BackPack</Link>{menu === "kids" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("backpack")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/backpack'>TravelBag</Link>{menu === "backpack" ? <hr /> : <></>}</li>
        {/* <li onClick={() => setMenu("travelbag")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/travelbag'>TravelBag</Link>{menu === "travelbag" ? <hr /> : <></>}</li> */}
      </ul>

      {/* Search Icon (Click to toggle search bar) */}
      <div className="nav-search-container">
        <img 
          src={SearchIcon} 
          alt="Search" 
          className='search-icon' 
          onClick={() => setShowSearch(!showSearch)} 
        />
      </div>

      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img className='cart' src={Cartlogo} alt='' /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
