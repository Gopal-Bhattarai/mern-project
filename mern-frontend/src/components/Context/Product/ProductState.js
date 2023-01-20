import { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
    const urlHost = process.env.REACT_APP_HOST;
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);

    const getProducts = async () =>{
        const response = await fetch(`${urlHost}/api/products/getproducts`,{
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setProducts(json)
    };

    const getPublicProducts = async (page) =>{
        const response = await fetch(`${urlHost}/api/products/public?page=${page}`,{
            method: 'GET',
        })
        const json = await response.json();
        setProducts(json.product)
    };

    const getProduct = async (productid) => {
        const response = await fetch(`${urlHost}/api/products/getproduct/${productid}`,{
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setProduct(json)
    }

    return (
        <div>
            <ProductContext.Provider value={{product, setProduct, getProduct, getPublicProducts, products, setProducts, getProducts}}>
                {props.children}
            </ProductContext.Provider>
        </div>
    ) 
}

export default ProductState