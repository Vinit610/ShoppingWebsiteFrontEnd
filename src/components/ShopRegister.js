import React, {useState} from 'react';
import '../Css/ShopRegister.css' 
import axios from 'axios'

const ShopRegister = props => {
    const [shop, setShop] = useState({});
    const [msg, setMsg] = useState('');
    const [imageFile, setimageFile] = useState({});

    function changeHandler(e){
        setShop({...shop, [e.target.name] : e.target.value });
    }

    function catagoryHandler(e){
        const catagories = e.target.value.split(',');
        var arr = [];
        catagories.map((content) =>
            arr.push({name : content}) 
        );
        setShop({...shop, catagories : arr})
    }

    function imageHandler(e){
        console.log("came here!!")
        setimageFile(e.target.files[0])
    }

    function submitHandler(e){
        e.preventDefault();
        let data = new FormData();
        data.append('shop', JSON.stringify(shop));
        data.append('file', imageFile);
        axios.post('http://localhost:5000/addshop', data)
        .then(response => {
            if(response.status === 200) {
                setMsg('Your Shop has been registered succesfully!!!!')
            }else{
                setMsg('Sorry! Please try again in some time!!!!')
            }
        })
        .catch(error => {
            setMsg('Sorry! Services are down, Please try again in some time!!!!')
            console.log(error);
        })
    }

    return (
        <div class="container">
        <form onSubmit={submitHandler}>
            <div class="row">
            <div class="col-25">
                <label for="fname">Shop Name</label>
            </div>
            <div class="col-75">
                <input type="text" id="fname" name="name" placeholder="ShopName.." onChange={changeHandler} required/>
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="country">Email</label>
            </div>
            <div class="col-75">
                <input type="text" id="address" name="email" placeholder="Shop Address" onChange={changeHandler} required/>
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="country">password</label>
            </div>
            <div class="col-75">
                <input type="password" id="address" name="password" placeholder="password" onChange={changeHandler} required/>
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="lname">Catagories</label>
            </div>
            <div class="col-75">
                <input type="text" id="lname" name="catagories" placeholder="Men, Women, .." onChange={catagoryHandler} required/>
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="lname">Select the photo of the shop</label>
            </div>
            <div class="col-75">
                <input type="file" name="shopImage" accept="image/*" onChange={imageHandler}/>
            </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="subject">Say something about your shop</label>
            </div>
            <div class="col-75">
                <textarea id="subject" name="description" placeholder="Write something.." style={{"height":"200px"}} onChange={changeHandler} required></textarea>
            </div>
            </div>
            <div class="row">
            <input type="submit" value="Submit"/>
            </div>
        </form>
        <div>
            <h2>
                {msg}
            </h2>
        </div>
        </div>
    );
};

export default ShopRegister;