import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    
    // Set initial selected image to 'image' (main image) or first from 'images' array
    const [selectedImage, setSelectedImage] = useState(product.image || product.images[0]);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Display all images dynamically */}
                    {product.images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img} 
                            alt="" 
                            onClick={() => setSelectedImage(img)} // Update main image
                            className={selectedImage === img ? 'active-thumbnail' : ''}
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={selectedImage} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ₹{product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ₹{product.new_price}
                    </div>
                </div>    
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum optio hic, iste ut ad eos quo laborum eius exercitationem deleniti laboriosam distinctio repellendus accusamus voluptatibus id provident sunt, reiciendis recusandae!
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span> Women, T-shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Modern, Latest</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
