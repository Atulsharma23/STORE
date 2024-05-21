import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiIntegration = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setData(response.data);
      console.log(response.data, "This is response of api");
    } catch (error) {
      console.log(error, "Error in getting data");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container'>
      <div className="flex-box">
        <h1>Product Listing</h1>
        <div className="product-box">
          {data && data.length !== 0 && data.map((item, index) => (
            <div className="image" key={index}>
              <img src={item.thumbnailUrl} alt={item.title} />
            </div>



          ))}
        </div>

      </div>
    </div>
  );
}

export default ApiIntegration;
