import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import { Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShopLogin from './ShopLogin'
import UserLogin from './UserLogin'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 20 + rand();
    const left = 20 + rand();

    return {
        top: `10%`,
        left: `10%`,
        transform: `translate(-${top}%, -20%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function LoginMain(props){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [openForUser, setOpenForUser] = React.useState(false);
    const [openForShop, setOpenForShop] = React.useState(false);

    const handleOpenForShop = () => {
        setOpenForShop(true);
      };
    
      const handleOpenForUser = () => {
        setOpenForUser(true);
      };

      const handleCloseForUser = () => {
        setOpenForUser(false);
      };

      const handleCloseForShop = () => {
        setOpenForShop(false);
      };
    return (
        <div style={modalStyle} className={classes.paper}>
        <Button variant="contained" color="primary" onClick={handleOpenForUser}>User</Button>
        <Button variant="contained" color="primary"  style={{margin:"20px"}} onClick={handleOpenForShop}>ShopKeeper</Button>
                    <Modal
                        open={openForShop}
                        onClose={handleCloseForShop}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                    <ShopLogin setLogIn={props.setLogIn} setShopName={props.setShopName}/>
                    </Modal>
                    <Modal
                        open={openForUser}
                        onClose={handleCloseForUser}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                    <UserLogin setCurrentUserFirstName={props.setCurrentUserFirstName} setCurrentUserLastName={props.setCurrentUserLastName} setUserLogIn={props.setUserLogIn} setUserId={props.setUserId}/>
                    </Modal>
        {/* </Modal> */}
</div>
    );
}
