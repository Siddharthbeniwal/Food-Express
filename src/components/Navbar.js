import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../screens/Modal'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const [showCart, setShowCart] = useState(false)

    const cartData = useSelector(state => state.cartData)

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success navbar-fixed">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-4 fst-italic fw-bold text-white" to="/">Food Express</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem('authToken')) ? <li className="nav-item">
                                <Link className="nav-link text-white" to="/myOrders">My Orders</Link>
                            </li> : ''}
                        </ul>

                        {!(localStorage.getItem('authToken')) ?
                            <div className='d-flex'>
                                <Link className="nav-link text-success bg-white me-3" aria-current="page" to="/login">Login</Link>
                                <Link className="nav-link text-success bg-white me-3" aria-current="page" to="/signUp">Sign Up</Link>
                            </div> :

                            <div className='d-flex'>
                                <Link className="nav-link text-success bg-white me-3" aria-current="page"
                                    onClick={() => setShowCart(true)}
                                >Cart {'  '}
                                    <Badge pill bg='danger'>{cartData.length}</Badge>
                                </Link>

                                <Link className="nav-link text-danger bg-white me-3" aria-current="page"
                                    onClick={() => localStorage.removeItem('authToken')} to="/login">Log Out</Link>

                                {showCart ?
                                    <Modal
                                        onClose={() => setShowCart(false)}>
                                    </Modal>
                                    : null
                                }
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
