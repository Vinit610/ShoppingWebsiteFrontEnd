import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function AddItems(props) {
    const [item, setItem] = useState({})
    const [catagories, setCatagories] = useState([])
    const [imageFile, setimageFile] = useState({});
    const [msg, setMsg] = useState('')

    useEffect(() => {
        console.log(props)
        axios.get(`http://localhost:5000/getcatagories/${props.match.params.shopname}`)
        .then(response =>{
            setCatagories(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        setItem({'catagory' : catagories[0]})
    }, []);

    function handleChange(e){
        setItem({...item, [e.target.name] : e.target.value})
    }

    function imageHandler(e){
        console.log("came here!!")
        setimageFile(e.target.files[0])
    }

    function handleSubmit(e){
        e.preventDefault();
        let data = new FormData();
        data.append('shop', JSON.stringify(item));
        data.append('file', imageFile);
        axios.post(`http://localhost:5000/additemtoshop/${props.match.params.shopname}`, data)
        .then(response =>{
            console.log(response.data);
            setMsg('Item has been added successfully!!')
        })
        .catch(error => {
            setMsg('Sorry ! Something is Wrong, Try again in some time !!')
            console.log(error);
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" onChange={handleChange} /> <br/>
                <label>Price: </label>
                <input type="number" name="price" onChange={handleChange} /> <br/>
                <label>Catagory : </label>
                <select name = "catagory" onChange={handleChange} defaultValue={catagories[0]}>
                {
                catagories.map((catagory) =>
                <option key={catagory.name} value={catagory.name}>{catagory.name}</option>
                )
                }
                </select>
                <input type="file" name="itemImage" accept="image/*" onChange={imageHandler}/>
                <label>SubCatagory : </label>
                <input type="text" name="subCatagory"onChange={handleChange}/> <br/>
                <input type="submit" value="Submit" />
            </form>
            <h2>
                {msg}
            </h2>
      </div>
    );

};