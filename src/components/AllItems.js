import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
// import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 260,
      maxHeight: 290,
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

export default function AllItems({match}) {
    // const [catagories, setCatagories] = useState([]);
    const [items, setItems] = useState(new Map());
    const classes = useStyles();
    const [catagory, setcatagory] = useState([]);
    function fetchCatagory(){
        axios.get(`http://localhost:5000/getcatagories/${match.params.shopname}`)
        .then(response => {
            setcatagory(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function fetchItems(){
      axios.get(`http://localhost:5000/getallitems/${match.params.shopname}`)
            .then(response => {
                const group = response.data.reduce((acc, item) => {
                    if (!acc[item.catagory]) {
                      acc[item.catagory] = [];
                    }
                    acc[item.catagory].push(item);
                    setItems(new Map(items.set(item.catagory, acc[item.catagory])))
                    return acc;
                  }, {})
                  console.log("data", group)
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchCatagory()
        fetchItems()
        console.log(items)
    }, []);
    
        return (
          // console.log("nnnn", items)
            // <p>Hey</p>
            // catagory.map((catagory) =>
            //     {
                  items.map((item)=> 
                        <p>{item.name}</p>
                    )
            //     }
            // )

            // items.map((item) =>
            // <Card className={classes.root}>
            //     <CardHeader subheader={item.name}/>
            //         <CardMedia
            //         style = {{ height: 0, paddingTop: '72%'}}
            //         image={`data:image/jpeg;base64,${item.itemImage.picByte}`}
            //         title="Paella dish"/>
            //         <CardContent>
            //             <Typography variant="body2" color="textSecondary" component="p">
            //             {item.name} : {item.price}
            //             </Typography>
            //     </CardContent>
            // </Card>
    );
};