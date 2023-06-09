import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"

const Edit = () => {

  
  const navigate = useNavigate();
  
        const [inputVal, setInputVal] = useState({
            firstname:"",
            lastname:"",
            email:'',
            mobile:"",
            gender:"",
            profile:"",
            active:"",
            location:""
        })
    
        const setData = (e) =>{
            console.log(e.target.value);
            const {name, value} = e.target;
            setInputVal((preval)=>{
                return{
                    ...preval, [name]:value
                }
            })
    
        }


        const {id} =useParams("");



    // console.log(getuserdata);
  
    const getdata = async(e) =>{
      const res = await fetch(`/getuser/${id}`,{
        method:"GET",
        headers:{"Content-Type":"application/json"}
        
      })
  
      const data = await res.json()
      console.log(data);
  
      if(res.status === 422 || !data ){
       
        console.log("error");
      }
      else{
        setInputVal(data);
        console.log("get data")
      }
  
    }
  
    useEffect(()=>{
      getdata()
    }, [])




    
    const updateuser = async(e) =>{
      e.preventDefault();
      const {firstname,lastname,email, mobile, gender, profile, active, location} = inputVal;

      const res2 = await fetch(`/updateuser/${id}`, {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({firstname,lastname,email, mobile,gender, profile, active, location})
      })

      const data2 = await res2.json();
      console.log(data2)
      if(res2.status === 422 || !data2){
        alert("fill the data");
      }else{
        
        alert("data added sucessfully");
        navigate("/")
      }
    }
    
    // console.log(inputVal)
    
      return (
        <div>
          <div className="container">
            <Link to="/" className="btn btn-danger mt-3">
              Home
            </Link>
          </div>
    
          <div className="text-center h1">Edit Your Details</div>
          <form action="" className="w-75 d-flex m-auto mt-5 shadow p-3 mb-5 bg-white rounded">
            <div className='row'>
                
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter First Name"
                value={inputVal.firstname}
                name= "firstname"
                onChange={setData}
              />
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Last Name"
                value={inputVal.lastname}
                onChange={setData}
    
                name= "lastname"
              />
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Email"
                name= "email"
                onChange={setData}
    
                value={inputVal.email}
              />
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Mobile"
                name= "mobile"
                onChange={setData}
    
                value={inputVal.mobile}
              />
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault1"
                onChange={setData}
    
                  value="male"
                  checked= {inputVal.gender==="male"}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                onChange={setData}
    
                  id="flexRadioDefault2"
                  checked ={inputVal.gender==="female"}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                
          
              <select className="form-select" aria-label="Default select example" name="active" value={inputVal.active}  
                onChange={setData}
              
              >
                <option select="true" >select</option>
                <option >Active</option>
                <option >InActive</option>
              </select>
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="formFile" className="form-label">
                Select Your Profile
              </label>
              <input
                className="form-control"
                type="img"
                id="formFile"
                name="profile"
                value={inputVal.profile}
                onChange={setData}
              />
            </div>
    
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter Your Location
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your location"
                name="location"
                value={inputVal.location}
                onChange={setData}
              />
            </div>
            <button type="submit" onClick={updateuser} className="btn btn-danger mt-3 m-auto" style={{width:"98%"}} >Submit</button>
            </div>
          </form>
        </div>
    )
}

export default Edit
