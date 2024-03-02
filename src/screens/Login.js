import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URLS } from '../appConstants';

const Login = () => {

    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch(API_URLS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userCredentials.email,
                password: userCredentials.password
            })
        })
        const userLoginResponse = await response.json()

        if (userLoginResponse.success) {
            localStorage.setItem('authToken', userLoginResponse.authToken)
            localStorage.setItem('userEmail', userLoginResponse.userData.email)
            localStorage.setItem('username', userLoginResponse.userData.username)
            navigate('/')
            
        } else {
            alert('Please enter valid credentials')
        }

    }

    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='form-container'>
            <form>
                <h1 className='heading'>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userCredentials.email}
                        onChange={(e) => handleChange(e)
                        } aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userCredentials.password}
                        onChange={(e) => handleChange(e)}
                        placeholder="Password" />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary bg-success"
                    onClick={handleLogin}
                >Login
                </button>
                <Link
                    to="/signUp"
                    className="m-3 btn btn-primary"
                >New user?
                </Link>
            </form>
        </div>
    )
}

export default Login
