
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './Components/Home';
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Register from './Components/Register';
import Edit from './Components/Edit';
import Details from './Components/Details';

function App() {
  return (
    <>
    
    <Router>
    <Header />
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/register'  element={<Register />} />
        <Route path='/edit/:id'  element={<Edit />} />
        <Route path='/view/:id'  element={<Details />} />



      </Routes>
    </Router>
    </>
  );
}

export default App;
