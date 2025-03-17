import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import clutch_banner from './Components/Assets/clutch_banner.png'
import handbag_banner from './Components/Assets/Handbag_banner.png'
import backpack_banner from './Components/Assets/backpack_banner.jpeg'
import travelbag_banner from './Components/Assets/travelbag_banner.jpeg'; 
import Wishlist from './Pages/WishList';
import PlaceOrder from './Pages/PlaceOrder';


function App() {
  return (
    <div>
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/clutches' element={<ShopCategory banner={clutch_banner} category="clutch"/>}/>
        <Route path='/purses' element={<ShopCategory banner={handbag_banner} category="purse"/>}/>
        <Route path='/backpacks' element={<ShopCategory banner={backpack_banner} category="backpack"/>}/>
        <Route path='/travelbags' element={<ShopCategory banner={travelbag_banner} category="travelbag" />} />
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path="/place-order" element={<PlaceOrder/>} />
      </Routes>
      <Footer/>
      
     
    </div>
  );
}

export default App;
