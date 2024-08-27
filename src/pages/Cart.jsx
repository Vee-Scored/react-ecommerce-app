import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import CartSection from '../components/CartSection'

const Cart = () => {
  return (
    <Container className={"flex flex-col"}>
        <BreadCrumb>
            Cart
        </BreadCrumb>
        <CartSection />

    </Container>
  )
}

export default Cart