import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../context/context";
import Card from "./Card/Card";
import "./style.css";

const Users = () => {
  const { getUsers, users, searchUser } = useAPI();
  const [number, setNumber] = useState(1);
  const filesPerPage = 6;
  const lastuser = number * filesPerPage;
  const firstuser = lastuser - filesPerPage;
  const currentUsers = users.slice(firstuser, lastuser);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(users.length / filesPerPage); i++) pageNumber.push(i);

  const ChangePage = (pageNumber) => {
    const maxPage=Math.ceil(users.length / filesPerPage);
    if(pageNumber!==0 && pageNumber <= maxPage){
      setNumber(pageNumber);
    }else{
      alert("Page Limit Exceeded")
    }
  };
  
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.input.value !==""){
         searchUser(e.target.input.value)
    }else{
     getUsers();
    }
  };

  return (
    <div className="container">
    <h1>Users</h1>
      <div className="input-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" className="input" name="input" />
          <input type="submit" className="search" value="Search" />
        </form>
        <Link className="link" to="/">Uploads</Link>
      </div>
      <div className="card-container">
        {currentUsers.map((each) => (
          <Card data={each} key={each._id} />
        ))}
      </div>
      <div className="paginate">
            <button className="paginatebtn" onClick={() => ChangePage(number - 1)}>Previous</button>
              {pageNumber.map((Elem,i) => { return (<button  key={i} className="paginatebtn" onClick={() => ChangePage(Elem)}> {Elem} </button>) })}
            <button className="paginatebtn" onClick={() => ChangePage(number + 1)}>Next</button>        
      </div>
    </div>
  );
};

export default Users;
