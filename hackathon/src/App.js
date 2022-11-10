import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios"
import { useState, useEffect } from 'react'
 
function App() {

  // const [chartData, setChartData] = useState({});
  const [users, setUser] = useState([])
  const [posts, setPost] = useState([])

  useEffect(() => {
    let rval = {};
    let postsList = [];
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        response.data.forEach(element => {
          rval[element.userId] = (rval[element.userId] || 0) + 1;
        });
        for (const [key, value] of Object.entries(rval)) {
          postsList.push(value);
        }
        setPost(() => ( 
          postsList
         ))


      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    let rval = {};
    let usersList = [];
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        response.data.forEach(element => {
          rval[element.id] = (element.name)
        });
        for (const [key, value] of Object.entries(rval)) {
          usersList.push(value);
        }
        setUser(() => (  usersList  ))

      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  // useEffect(() => { 
  //   setChartData([{
  //     type: 'bar',
  //     x: users,
  //     y: posts
  //   }]);
  //   console.log(chartData);
  // }, [users, posts])

  return (
    <div className="Container-fluid">
      <div className="row">
        <div className="col">
          <Plot 
            //This work : 
            // data={[
            //   { type: 'bar',
            //   x: Object.values(users) ,
            //   y: Object.values(posts) },
            // ]}

            //This work too
            data={[
              { type: 'bar',
              x:  users  ,
              y: posts  },
            ]} 
          // layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
          />
        </div>
      </div>
    </div>
  );
}

export default App;