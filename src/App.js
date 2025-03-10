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
import kid_banner from './Components/Assets/banner_kids.png'
import travelbag_banner from './Components/Assets/clutch_banner.png'; 


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/clutches' element={<ShopCategory banner={clutch_banner} category="clutch"/>}/>
        <Route path='/purses' element={<ShopCategory banner={handbag_banner} category="purse"/>}/>
        <Route path='/backpacks' element={<ShopCategory banner={kid_banner} category="backpack"/>}/>
        <Route path='/travelbags' element={<ShopCategory banner={travelbag_banner} category="travelbag" />} />
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>


      </Routes>
      <Footer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
