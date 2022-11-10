import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios"
import {useState, useEffect} from 'react'

function getUser() {
  let rval = {}
  let rrval = [];
  axios.get('https://jsonplaceholder.typicode.com/users')
  .then(function (response) {
    response.data.forEach(element => {
      rval[element.id] = (element.name)
    }); 
    for (const [key, value] of Object.entries(rval)){
      rrval.push(value);
    }
    console.log(rrval);
    return rrval;
  }) 
}
function getPost() {
  let rval = {};
  let rrval = [];
  axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    response.data.forEach(element => {
      rval[element.userId]=(rval[element.userId] || 0) + 1;
    }); 
    for (const [key, value] of Object.entries(rval)){
      rrval.push(value);
    }
    console.log(rrval);
    return rrval;
  }) 
}

function App() {
  
  const [chartData, setChartData] = useState({});
  const[user, setUser] = useState([])
  const[post, setPost] = useState([])
  
  const chart = () => {
    let users = [];
    let posts = [];
    let rval = [];
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => { 
        response.data.forEach(element => {
          rval[element.userId]=(rval[element.userId] || 0) + 1;
        }); 
        for (const [key, value] of Object.entries(rval)){
          posts.push(value);
        }
        setChartData({
          x: users,
          y: posts,
          type: 'bar'
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
      response.data.forEach(element => {
        rval[element.id] = (element.name)
      }); 
      for (const [key, value] of Object.entries(rval)){
        users.push(value);
      } 
      setChartData({
        x: users,
        y: posts,
        type: 'bar'
      });
    }) 
       
  };

  useEffect(() => {
    chart();
  }, []);

    return (
      <div className = "Container-fluid">
        <div className = "row"> 
          <div className = "col">
          <Plot
        data={[ 
          {chartData},
        ]}
        // layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
          </div>
        </div>
      </div>
     
    );
  }

export default App;