import React from 'react'
import RatingStar from './RatingStar'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore';

const ProductCard = ({product}) => {
  const nav = useNavigate();
  const {addCartItem,removeCartItem,cartItems} = useCartStore();
  const cardHandler = () => {
    nav(`/product-detail/${product.id}`)
  }

  const existed = cartItems.find(item => item.productId == product.id)

  const addBtnHandler = (event) => {
    event.stopPropagation();
    const obj = {
      id : Date.now(),
      productId : product.id,
      quantity : 1
    }
    addCartItem(obj)
  }
  return (
    

<div onClick={cardHandler} className="w-full cursor-pointer mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <div>
    <img className="p-8 rounded-t-lg h-56 mx-auto" src={product.image} alt="product image" />
  </div>
  <div className="px-5 pb-5">
    <h5 className="text-xl my-3 line-clamp-1 font-semibold tracking-tight text-gray-900 dark:text-white">
        {
            product.title
        }
    </h5>
    <a href="#">
      <h5 className="text-sm line-clamp-2 font-semibold tracking-tight text-gray-900 dark:text-white">
        {
            product.description
        }
      </h5>
    </a>
    <div className="flex items-center mt-2.5 mb-5">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        
       <RatingStar rate={product.rating.rate}/>
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating.rate}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
      {
        existed ? <button disabled onClick={addBtnHandler} className="text-slate-300 text-nowrap bg-gray-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800">Added</button> : <button onClick={addBtnHandler} className="text-white text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
      }
    </div>
  </div>
</div>

  )
}

export default ProductCard