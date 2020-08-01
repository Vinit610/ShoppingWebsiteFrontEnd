import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import CardHeader from '@material-ui/core/CardHeader';

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
    }
  }));

export default function Catagories(props) {
    const [items, setItems] = useState([])
    const classes = useStyles1();

    function addToCart(item){
      if(props.userLogIn === false){
        alert("Please login First.")
      }else{
        console.log("update", props)
        axios.put(`http://localhost:5000/updateCart/${props.userId}`, item)
          .then(response => {
              console.log(response)
          })
          .catch(error => {
            console.log(error)
          }) 
      }
    }

    useEffect(() => {
        console.log("match prob", props)
        axios.get(`http://localhost:5000/getallitems/${props.match.params.name}/${props.match.params.catagory}`)
        .then(response =>{
            console.log(response.data);
            setItems(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

        return ( 
            items.map((item) =>
            <Card className={classes.root}>
            <CardHeader
                title= {item.name} 
              />
                    <CardMedia
                    style = {{ height: 0, paddingTop: '70%'}}
                    image={`data:image/jpeg;base64,${item.itemImage.picByte}`}
                    title="Paella dish"/>
                    <CardContent>
                        <Typography style = {{ float : "left"}} variant="body2" color="inherit" component="p">
                        Price : {item.price}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => addToCart(item)}>AddToCart</Button>
                    </CardContent>
            </Card>
            )
    );
};