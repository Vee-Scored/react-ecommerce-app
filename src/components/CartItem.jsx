import React from 'react'
import useProductStore from '../store/useProductStore'
import MinusComponent from './MinusComponent';
import PlusComponent from './PlusComponent';
import useCartStore from '../store/useCartStore';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const CartItem = ({item:{id,productId,quantity}}) => {
  const {products} = useProductStore();
  const {increaseQty, decreaseQty,removeCartItem} = useCartStore();
  const currentProduct = products.find(product => product.id == productId)

  const multiPrice = currentProduct.price * quantity
  const deleteNotify = ()=> toast.success("Item removed!")
  const increaseBtnHandler = () =>{
    increaseQty(id)
  }

  const decreaseBtnHandler = () => {
    if (quantity > 1) {
      decreaseQty(id)
    }  else {
      Swal.fire({
        title: 'Sure to Remove?',
      
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteNotify();
            removeCartItem(id)
            // Your code to handle the confirmation (e.g., delete action) goes here
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled'
            );
        }
    });
    }
  }

  return (
    <div  className='grid grid-cols-7 my-2  border border-gray-200 rounded-lg shadow px-5 py-2 '>
       <Toaster/>
        <div className='col-span-2 flex items-center justify-center '>
            <img className='h-16 ' src={currentProduct.image} alt="" />
        </div>
        <div className='col-span-3  font-semibold sm:py-2 px-2  flex  flex-col justify-center'>
            <h2 className='line-clamp-2'>{currentProduct.title}</h2>
            <p className='text-xs py-1 font-semibold text-red-500'>Price(${currentProduct.price})</p>
        </div>
        <div className='col-span-1'>
            <p className='text-sm pb-2'>Quantity</p>
            <div className=' flex flex-col sm:flex-row items-center  gap-2 '>
                <button className='rounded overflow-hidden' onClick={decreaseBtnHandler}>
                    < MinusComponent />
                </button>
                <p className='text-xs'>{quantity}</p>
                <button className='rounded overflow-hidden' onClick={increaseBtnHandler}>
                    <PlusComponent/>
                </button>
            </div>
        </div>
        <div className='col-span-1 flex flex-col font-semibold text-lg md:text-xl  items-center justify-center '>
            <h3>Cost</h3>
            <p>{multiPrice.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default CartItem