import React, { useState } from 'react';
import Navbar from './components/navbar'
import Shops from './components/shops'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Catagories from './components/catagories';
import Home from './components/Home';
import ShopRegister from './components/ShopRegister'
import CatagoryItems from './components/CatagoryItems'
import AllItems from './components/AllItems'
import AddItems from './components/AddItems'
import Cart from './components/Cart'
import LoginMain from './components/LoginMain'

function App() {
  const [LogIn, setLogIn] = useState(false);
  const [shopname, setShopName] = useState('');
  const [cart, setCart] = useState([]);
  const [userLogIn, setUserLogIn] = useState(false)
  const [userId, setUserId] = useState('');
  
  return (
    <Router>
      <div className="App">
        <Navbar name="Vinit" loggedIn = {LogIn} setLogIn = {setLogIn} shopname={shopname} setShopName={setShopName} userLogIn={userLogIn} setUserLogIn={setUserLogIn} setUserId={setUserId}/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/shops" exact component={Shops}/> 
          <Route path="/shops/:id" exact component={Catagories}/>
          <Route path="/allitems/:shopname" exact component={AllItems}/>
          <Route path="/additem/:shopname" exact component={AddItems}/>
          <Route path="/register" component={ShopRegister}/>
          <Route path="/shops/:name/:catagory" render = {props => <CatagoryItems {...props} userLogIn = {userLogIn} userId={userId}/>}/>
          <Route path="/cart" exact render = {props => <Cart {...props} userId={userId} /> }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
