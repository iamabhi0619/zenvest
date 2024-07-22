import React from 'react'
import { useLocation } from 'react-router-dom';


function Interview() {
  const location = useLocation();
  const data = location.state;
  console.log(data.message);
  return (
    <div>
    <h1>Interview</h1>
  </div>
  )

}

export default Interview