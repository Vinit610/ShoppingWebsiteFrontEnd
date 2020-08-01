import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const useStyles = makeStyles({
    table: {
      width: 800,
    },
  });
  
export default function Cart(props){
    const classes = useStyles();
    const [items, setItems] = useState([]);
    useEffect(()=> {
        console.log("123", props)
        axios.get(`http://localhost:5000/getUserCart/${props.userId}`)
        .then(response => {
            console.log("cart" , response.data)
            console.log("items", response.data.items)
            setItems(response.data.items)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
    <div style = {{marginLeft : "100px", marginTop: "50px"}}>
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell align="right">Item-Catagory</StyledTableCell>
            <StyledTableCell align="right">Item-Subcatagory</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.catagory}</StyledTableCell>
              <StyledTableCell align="right">{item.subCatagory}</StyledTableCell>
              <StyledTableCell align="right">{item.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
};