import p1_img from './Clutches/picture_1.jpg'
import p2_img from './Purses/picture_9.png'
import p3_img from './Backpacks/picture_8.png'
import p4_img from './TravelBags/picture_2.png'

import p1_product_i1 from '../Assets/Clutches/pic5_product_i1.jpg'
import p1_product_i2 from '../Assets/Clutches/pic5_product_i2.jpg'
import p1_product_i3 from '../Assets/Clutches/pic5_product_i3.jpg'

import p2_product_i1 from '../Assets/Purses/pic9_i1.png'
import p2_product_i2 from '../Assets/Purses/pic9_i2.png'
import p2_product_i3 from '../Assets/Purses/pic9_i3.png'

import p3_product_i1 from '../Assets/Backpacks/pic8_i1.png'
import p3_product_i2 from '../Assets/Backpacks/pic8_i2.png'
import p3_product_i3 from '../Assets/Backpacks/pic8_i3.png'

import p4_product_i1 from '../Assets/TravelBags/pic2_i1.png'
import p4_product_i2 from '../Assets/TravelBags/pic2_i2.png'
import p4_product_i3 from '../Assets/TravelBags/pic2_i3.png'

let data_product = [
  {
    id: 1,
    name: "Collar Peplum Hem Blouse",
    category: "clutch",
    image: p1_img,
    images: [p1_img, p1_product_i1, p1_product_i2, p1_product_i3],
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Blouse",
    category: "purse",
    image: p2_img,
    images: [p2_img, p2_product_i1, p2_product_i2, p2_product_i3],
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "backpack",
    image: p3_img,
    images: [p3_img, p3_product_i1, p3_product_i2, p3_product_i3],
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "travelbag",
    image: p4_img,
    images: [p4_img, p4_product_i1, p4_product_i2, p4_product_i3],
    new_price: 100.0,
    old_price: 150.0,
  },
];

export default data_product;
