import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';


const Details = () => {
    const {id} =useParams("");

const navigate = useNavigate()
    const [getuserdata, setGetuserdata] = useState([]);

    console.log(getuserdata);
  
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
        setGetuserdata(data)
        console.log("get data")
      }
  
    }
  
    useEffect(()=>{
      getdata()
    }, [])


    const deleteuser =async(id)=>{
      const res2 = await fetch(`/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const deletedata = await res2.json();
      console.log(deletedata);
      if(res2.status===422 || !deletedata){
        console.log("error");
      }
      else{
      console.log("user deleted");
      navigate("/")
      }
    }


    return (
        <div className='container mt-3'>
             <Link to="/" className="btn btn-danger mt-3">
          Home
        </Link>
        <div className="mt-3 h1">Welcome Mark</div>
        <Card style={{maxWidth:700}} className='shadow p-3 mb-5 bg-white rounded'>
            <CardContent className='d-felx '>
            <div className="d-flex justify-content-end ">
                        
                        <Link to={`/edit/${getuserdata._id}`}  className='text-white h4 border-0 bg-success rounded p-2' ><i className="fa-solid fa-pen-to-square"></i></Link>
                        <button  onClick={()=>deleteuser(getuserdata._id)} className='text-white mx-2 h4 border-0 bg-danger rounded p-2 d-flex align-item-center'><i className="fa-solid fa-trash "></i></button>
                    </div>
                <div className='row'>
                <div className="left_view col-lg-6 col-md-6 col-12">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="mx-3" style={{width:"50px"}} 
                alt='profile' />
                <h4 className="m-3">Name: <span >{getuserdata.firstname}{" "}{getuserdata.lastname}</span></h4>
                <h4 className="m-3"><i className="fa-solid fa-envelope"></i> Email: <span>{getuserdata.email}</span></h4>
                <h4 className="m-3"><i className="fa-solid fa-mobile-screen"></i> Mobile: <span>{getuserdata.mobile}</span></h4>
                </div>

                <div className="right_view mt-3 col-lg-6 col-mg-6 col-12">
                    
                <h4 className="m-3"><i className="fa-solid fa-venus-mars"></i> gender: <span>{getuserdata.gender}</span></h4>
                <h4 className="m-3">Status: <span>{getuserdata.active}</span></h4>
                <h4 className="m-3"><i className="fa-sharp fa-solid fa-location-dot"></i> Location: <span>{getuserdata.location}</span></h4>
                </div>
                </div>
                


            </CardContent>
        </Card>

        </div>
    )
}

export default Details
