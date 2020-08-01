import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        display: 'block',
        width: '17vw',
        transitionDuration: '0.3s',
        height: '15vw',
        float: "left"
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 20
    },
    pos: {
      marginBottom: 12
    }
  });

export default function Catagories({match}) {
    const [catagories, setCatagories] = useState([])
    const classes = useStyles();
    useEffect(() => {
        console.log(match);
        axios.get(`http://localhost:5000/getcatagories/${match.params.id}`)
        .then(response =>{
            console.log(response.data);
            setCatagories(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
    
        return ( 
            catagories.map((catagory) =>
            <Link to={`${match.url}/${catagory.name}`}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        >
                        {catagory.name}
                        </Typography>
                        <br/><br/><br/><br/><br/><br/><br/>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Link>)
    );
};