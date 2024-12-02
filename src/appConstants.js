let env_url = "https://foodexpressbackend-s61j.onrender.com";

// use this code when server is running locally
if (window.location.hostname === "localhost") {
  env_url = "http://localhost:5000";
}

export const API_URLS = {
  SIGN_UP: `${env_url}/api/createUser`,
  LOGIN: `${env_url}/api/userLogin`,
  DISPLAY_FOOD_DATA: `${env_url}/api/displayFoodData`,
  CREATE_ORDER: `${env_url}/api/createOrder`,
  GET_MY_ORDERS: `${env_url}/api/getMyOrders`,
};

export const ABOUT_US_INFO = {
  ABOUT_US_TEXT: `'Food Express' is a food ordering app developed by Siddharth Beniwal using MERN stack (MongoDB, Express.js, React.js, Node.js) 
    It is seamlessly integrated with Redux Toolkit for state management. It uses JWT for authentication tokens which enhances the security 
    of the system by providing a secure and efficient way to verify user identity. Additionally, it uses bcrypt to hash and store encrypted
    passwords which adds an extra layer of protection, ensuring that sensitive user data remains confidential.`,

  LOGIN_INFO_1:
    "Go to top-right corner and Sign Up using email id and password and then Login with the same credentials.",

  LOGIN_INFO_2: "Directly Login with dummy user:",

  CREDENTIAL: "johndoe@gmail.com",

  ABOUT_US_TEXT_FRONTEND_ONLY: (
    <>
      'Food Express' is a food ordering app developed by Siddharth Beniwal using
      MERN stack (MongoDB, Express.js, React.js, Node.js) It is seamlessly
      integrated with Redux Toolkit for state management. It uses JWT for
      authentication tokens which enhances the security of the system by
      providing a secure and efficient way to verify user identity.
      Additionally, it uses bcrypt to hash and store encrypted passwords which
      adds an extra layer of protection, ensuring that sensitive user data
      remains confidential.
      <br />
      <br />
      Note: The current version of this website does not include server
      integration. For a complete overview of the codebase and a demonstration
      of the website with backend integration, please check below:
      <br />
      <br />
      <a
        href="https://drive.google.com/file/d/11QUvA5GaTwPHY-CXkIG2jOGtNKd070Rz/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Video demonstration with backend integration
      </a>
      <br />
      <a
        href="https://github.com/Siddharthbeniwal/Food-Express"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to code repository
      </a>
    </>
  ),
};

export const LOGIN_ALERT_MSG = "Please login to add items to your cart.";

export const SIGN_UP_ALERT_MSG =
  "Sign Up is not available at the moment, please login using 'johndoe@gmail.com' as email and password.";

export const LOGIN_CREDENTIALS = {
  DUMMY_USER_EMAIL: "johndoe@gmail.com",
  DUMMY_PASSWORD: "johndoe@gmail.com",
  DUMMY_USERNAME: "John Doe",
};

export const ORDER = {
  SUCCESS_MSG: "Order placed successfully!",
  FAILURE_MSG: "Failed to place order!",
  FETCH_ERROR_MSG: "Could not fetch data.",
};
