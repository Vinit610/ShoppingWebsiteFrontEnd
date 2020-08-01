import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
// import Login from 'Login.js'
import LoginMain from '../components/LoginMain'
import UserSignUp from '../components/UserSignUp'
import { makeStyles } from '@material-ui/core/styles';

const Navbar= (props) => {
    const [open, setOpen] = React.useState(false);
    const [userSignUpOpen, SetUserSignUpOpen] = React.useState(false);
    const [currentUserFirstName, setCurrentUserFirstName] = useState('');
    const [currentUserLastName, setCurrentUserLastName] = useState('');

    function onLogoutClick(e){
        props.setLogIn(false);  
        props.setUserLogIn(false);
    }
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleUserSignUpOpen = () => {
        SetUserSignUpOpen(true);
      };
    
      const handleUserSignUpClose = () => {
        SetUserSignUpOpen(false);
      };
    const linkStyle = {
        color: "inherit",  
        textDecoration: 'none'
    }
    const loginStyle = {
        color: "inherit",  
        textDecoration: 'none',
        float: 'right'
    }
    return (
    <div>
    <AppBar position="static">
        <Toolbar>
            <Link to="/" style={linkStyle}><Button color="inherit">Home</Button></Link>
            {
                !props.loggedIn && <Link to="/shops" style={linkStyle}><Button color="inherit">Shops</Button></Link>
            }
            <Link to="/Aboutus" style={linkStyle}><Button color="inherit">About-Us</Button></Link>
            {
               !(props.loggedIn || props.userLogIn) && <Link to="/register" style={linkStyle}><Button color="inherit">Register-A-Shop</Button></Link>
            }
            {
                props.loggedIn && <Link style= {linkStyle} to={{pathname: `/allitems/${props.shopname}`}}><Button color="inherit">AllItems</Button></Link>
            }
            {
                props.loggedIn && <Link style= {linkStyle} to={{pathname: `/additem/${props.shopname}`}}><Button color="inherit">AddItem</Button></Link>
            }
            {<Link style= {linkStyle} to="/cart"><Button color="inherit">Cart</Button></Link>}
           {
                !(props.loggedIn || props.userLogIn) && 
                <div>
                    <Button color="inherit" onClick={handleUserSignUpOpen}>SignUp For User</Button>
                    <Modal
                        open={userSignUpOpen}
                        onClose={handleUserSignUpClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                    <UserSignUp/>
                    </Modal>
            </div>
            }
            {
                !(props.loggedIn || props.userLogIn) && 
                <div>
                    <Button color="inherit" onClick={handleOpen}>Login</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                    <LoginMain setLogIn={props.setLogIn} setShopName={props.setShopName} setCurrentUserFirstName={setCurrentUserFirstName} setCurrentUserLastName={setCurrentUserLastName} setUserLogIn={props.setUserLogIn} setUserId={props.setUserId}/>
                    </Modal>
            </div>
            }
            {
                (props.loggedIn || props.userLogIn) && <Link to="/" style={linkStyle}><Button color="inherit" onClick={onLogoutClick}>Logout</Button></Link>
            }
            {
                props.userLogIn && 
                <div style={{float: 'right'}}>
                     <Typography component="p">Welcome , {currentUserLastName}  {currentUserFirstName}</Typography>
                </div>
            }
        </Toolbar>
    </AppBar>
    </div> 
     );
}
 
export default Navbar;