import React, { useEffect, useState } from "react";
import Modalevent from "./Modalevent";

const Eventlisting = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust the number of items per page as needed

  const updateEvents = async () => {
    try {
      let url = "http://localhost:3001/events";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const eventsWithParsedPhotoUrls = data.map((event) => {
          return {
            ...event,
            photo: parsePhotoUrl(event.photo),
          };
        });
        setEvents(eventsWithParsedPhotoUrls);
      } else {
        console.error("No events data found.");
      }
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const parsePhotoUrl = (url) => {
    // Add your logic to parse or modify the photo URL here
    return url;
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container">
      <div className="row my-3">
        {currentEvents.map((data) => (
          <div key={data.id} className="col-md-4">
            <div className="card mb-4">
              <img src={data.photo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{data.eventName}</h5>
                <p className="card-text">
                  {data.eventDescription && data.eventDescription.slice(0, 120)}
                </p>
                <Modalevent data={data} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={handlePrevPage}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={handleNextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Eventlisting;
