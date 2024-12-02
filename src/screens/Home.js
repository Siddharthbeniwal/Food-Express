import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Carousel from '../components/Carousel';
import { setIsLoggedIn } from "../features/foodExpressSlice";
import { LOGIN_CREDENTIALS } from "../appConstants";

const Home = () => {
    const isFrontendOnly = useSelector((state) => state.isFrontendOnly);
    const dispatch = useDispatch();
  
    if (isFrontendOnly) {
      dispatch(setIsLoggedIn({ type: "LOGIN" }));
      localStorage.setItem("userEmail", LOGIN_CREDENTIALS.DUMMY_USER_EMAIL);
      localStorage.setItem("username", LOGIN_CREDENTIALS.DUMMY_USERNAME);
    }
  
    return (
        <div>
            <Navbar />
            <Carousel/>
            <div>
                <Cards/>
            </div>
            <Footer />
        </div>
    )
}

export default Home
