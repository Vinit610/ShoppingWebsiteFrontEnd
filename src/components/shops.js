import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

  const useStyles1 = makeStyles((theme) => ({
    root: {
      width: 250,
      height: 290,
      marginLeft: "10px",
      marginRight: "10px",
      marginTop: "10px",
      marginBottom: "10px",
      float: "left",
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
      textDecoration: null,
    },
  }));
  export default function Shops() {
    const classes = useStyles1();
    const [shops, setShops] = useState([])
    // const [image, setImage ] = useState();
    
    function fetchdata(){
        axios.get('http://localhost:5000/getshops')
        .then(response =>{
            console.log(response.data)
            setShops(response.data)
            console.log("shop", shops)
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
      shops.map((shop) =>
        <Link to={`/shops/${shop.name}`}>
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {shop.name[0]}
                </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                title={shop.name}
                subheader="Sector 21"
              />
                    <CardMedia
                    style = {{ height: 0, paddingTop: '72%'}}
                    image={`data:image/jpeg;base64,${shop.shopImage.picByte}`}
                    title="Paella dish"/>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {shop.description}
                        </Typography>
                    </CardContent>
            </Card>
            </Link>
        )
    );
};
