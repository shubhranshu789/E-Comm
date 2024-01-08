import React from 'react'
import './AddProduct.css'
import { useState,Link,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


export default function AddProduct() {
  const navigate = useNavigate()

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const [heading, setHeading] = useState('');
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [pic, setPic] = useState('');

  const [url, setUrl] = useState("");

  const loadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  }





  useEffect(() => {
    if(url){
      fetch("http://localhost:5000/createPost" , {
      method:"post",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title : heading,
          desc : desc,
          price : price,
          pic : url


          //pic is not setting 

      })
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        notifyA(data.error)
      }else{
        notifyB(data.message)
        navigate('/')
      }
      console.log(data)
    })
    .catch(err => console.log(err))
    }
    
  }, [url]);


  const post = () => {
    // console.log(heading,desc,price,pic)
    const data = new FormData()
    data.append("file" , pic)
    data.append("upload_preset" , "e-comm")
    data.append("cloud_name" , "shubhcloud007")
    fetch("https://api.cloudinary.com/v1_1/shubhcloud007/image/upload",{
      method: "post",
      body: data
    }).then(res => (res.json()))
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))

  
  }



  return (
    <div>
      <div className="appProduct">
        <h3>Add a New Product</h3>
        <div className="file-Image">
          <img id="output" className='preview' src='data:image/jpeg;base64,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'/>
          <input type="file"  accept='image/*'  className='file'
          onChange={
            (event) => {loadFile(event)
            setPic(event.target.files[0])
            }}/>
        </div>

        <div className="productInfo">
          <input type="text" className='' placeholder='heading' value={heading} onChange={(e)=> {setHeading(e.target.value)}}/>
          <input type="text" className='' placeholder='Description' value={desc} onChange={(e)=> {setDesc(e.target.value)}}/>
          <input type="number" className='' placeholder='Price' value={price} onChange={(e)=> {setPrice(e.target.value)}}/>
        </div>


        <div className="button">
          <button onClick={() => {post()}}>Post</button>
        </div>
      </div>

      
    </div>
  )
}
