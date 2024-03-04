export const API_URLS = {
  SIGN_UP: 'http://localhost:5000/api/createUser',
  LOGIN: 'http://localhost:5000/api/userLogin',
  DISPLAY_FOOD_DATA: 'http://localhost:5000/api/displayFoodData',
  CREATE_ORDER: 'http://localhost:5000/api/createOrder',
  GET_MY_ORDERS: 'http://localhost:5000/api/getMyOrders'
};

export const ABOUT_US_TEXT = 
`"Food Express" is a food ordering app developed by Siddharth Beniwal using MERN stack (MongoDB, Express.js, React.js, Node.js) 
It is seamlessly integrated with Redux Toolkit for state management. It uses JWT for authentication tokens which enhances the security 
of the system by providing a secure and efficient way to verify user identity. Additionally, it uses bcrypt to hash and store encrypted
passwords which adds an extra layer of protection, ensuring that sensitive user data remains confidential.`
