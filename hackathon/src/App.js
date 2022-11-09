import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios"
import {useState} from 'react'

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
  const[user, setUser] = useState(getUser())
  const[post, setPost] = useState(getPost())

  
    return (
      <div className = "Container-fluid">
        <div className = "row"> 
          <div className = "col">
          <Plot
        data={[ 
          {
            x: getUser(),
            y: getPost(),
            type: 'bar'
          },
        ]}
        // layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
          </div>
        </div>
      </div>
     
    );
  }

export default App;