import React from 'react'
import ReactDom from 'react-dom'
import { useSelector } from 'react-redux'

export default function Modal({ onClose }) {

  const cartData = useSelector(state => state.cartData)
  const totalAmt = cartData.reduce((acc, curr) => acc += curr.price, 0)

  return ReactDom.createPortal(
    <>
      <div className='overlay-styles' />
      <div className='modal-styles'>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>

        {(cartData.length > 0) ?
          <table className='cart-table'>
            <thead className='bg-success'>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>

              {cartData.map((item, index) => (
                <tr key={index}>
                  <td>{item.quantity} x {item.name}</td>
                  <td> ₹ {item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ borderColor: 'transparent' }} />
                <td className='bg-success'>Total amount: ₹ {totalAmt}</td>
              </tr>
              <tr>
                <td style={{ borderColor: 'transparent' }} />
                <button className='bg-success'>
                  Checkout
                </button>
              </tr>
            </tfoot>
          </table> : <div className='text-success fs-1 fw-bold text-center'>
            The cart is empty.
          </div>}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}
