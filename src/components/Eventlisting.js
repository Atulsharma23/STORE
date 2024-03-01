import React, { useEffect, useState } from "react";
import Modalevent from "./Modalevent";
const Eventlisting = () => {
  const [events, setEvents] = useState([]);

  const updateEvents = async () => {
    let url = "http://localhost:3001/events";
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData, "This is Event listing");
    setEvents(parsedData);
  };

  useEffect(() => {
    updateEvents();
  }, []);

  return (
    <div className="container">
      <div className="row my-3">
        {events.map((data) => (
          <div key={data.id} className="col-md-4">
            <div className="card mb-4">
              <img src={data.photo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{data.eventName}</h5>
                <p className="card-text">{data.eventDescription.slice(0,120)}</p>

                <Modalevent data={data} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventlisting;
