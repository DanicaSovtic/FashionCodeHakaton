import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";



function TypesExample() {
  return (
    <>
      
      <a href="http://localhost:3000/main"><Button variant="success" id="company">FASHION COMPANY</Button>{' '}</a>
      <a href="http://localhost:3000/mainManufacturer"><Button variant="warning" id="manufacturer">MANUFACTURER</Button>{' '}</a>
      
    </>
  );
}


const Home=()=> {
  return TypesExample() ;
};

export default Home;




