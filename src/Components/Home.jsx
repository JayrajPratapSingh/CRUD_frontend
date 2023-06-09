
import React, { useEffect, useState } from "react";
import {CSVLink} from "react-csv"

// import Nav from "./Nav";
import { Link } from "react-router-dom";
const Home = () => {

  const [getuserdata, setGetuserdata] = useState([]);
  const [search, setSearch] = useState("")

  console.log(getuserdata);

  const getdata = async(e) =>{
    const res = await fetch("/getdata",{
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
    getdata();
    }
  }

  return (
   <>

<header >
       <nav className="navbar navbar-light bg-light">
  <form className="d-flex flex-row px-5">
    <input className="form-control mr-sm-2 p-2 mx-2 col-lg-6 col-md-6 col-12" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
    <button onClick={(e)=>e.preventDefault()} className="btn btn-danger my-2 my-sm-0 p-2 px-4 " type="submit">Search</button>
  </form>

  <span >
    
    <Link className="btn btn-danger me-2" type="button" to="/register">+ Add User</Link>
    <CSVLink className="btn btn-danger me-2" data={getuserdata}>Export to Csv</CSVLink>
  
  </span>
</nav>
</header>


 <div className="container " >


        
        <table className="table ">
          <thead>
            <tr className="table-dark">
              <th scope="col">ID</th>
              <th scope="col">Full name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {
            getuserdata.filter((element)=>{
              return search.toLowerCase() ===""? element : element.firstname.toLowerCase().includes(search)
            }).map((element, id) =>(

              <tr key={id}>
              <th scope="row">{id+1}</th>
              <td>{element.firstname} {element.lastname}</td>
              <td>{element.email}</td>
              <td>{element.gender==="male" ? "M" : "F"}</td>
              <td>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
            
      
            <select className="form-select" aria-label="Default select example" style={{backgroundColor:"brown", color:"white"}} >
              <option select="true" >{element.active}</option>
              <option >{element.active === "InActive"? "Active" : "InActive"}</option>
              
            </select>
          </div>
              </td>
  
              <td className="image">
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="profile"
                />
              </td>
  
              <td>
                <div className="dropdown ">
                  <button
                    className="btn border-white"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ><i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={`view/${element._id}`}>
                      <i className="fa-sharp fa-solid fa-eye text-primary"></i> View
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={`edit/${element._id}`}>
                      <i className="fa-solid fa-pen-to-square text-info"></i> Edit
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={()=>deleteuser(element._id)}>
                      <i className="fa-sharp fa-solid fa-trash text-danger"></i> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>

            ))}
            
          </tbody>
        </table>
      </div>
   </>
  );
};

export default Home;
