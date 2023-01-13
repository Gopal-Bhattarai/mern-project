import noImage from '../img/noImage.png'
import ProductContext from "../context/Product/ProductContext"
import { useContext } from 'react';

const ProductLeftBar = () => {
    const {getProducts, products} = useContext(ProductContext)
    const imageUrl =''
  return (
    products.map((product,i)=>{
        return (
        i<2 ?
        <div className="card" key={i}>
        <img src={imageUrl?imageUrl:noImage} height="80px" className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">{product.productName}</h5>
            <p className="list-group-item">Price: {product.price} </p>
            </div>
        </div>
        : void 0
        )
    })
  )
}

export default ProductLeftBar
