import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'


function App() {
  return (
    <Router>
      <div className="root-container">
        <Navbar/>
        <Routes>
          <Route exact path = '/' element = {<Home/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path = '/signUp' element = {<SignUp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;