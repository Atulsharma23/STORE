import React, { useState } from "react";
const Events = () => {
  const [eventName, SetEventName] = useState("");
  const [eventDescription, SetEventDescription] = useState("");
  const [overview, SetOverview] = useState("");
  const [instruction, SetInstruction] = useState("");
  const [address, SetAddress] = useState("");

  const [venue, SetVenue] = useState("");
  const [photo, SetPhoto] = useState("");

  function save() {
    let data = {
      eventName,
      eventDescription,
      overview,
      instruction,
      address,
      venue,
      photo
    };
    fetch("http://localhost:3001/events", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((resp) => {
        SetAddress("");
        SetEventDescription("");
        SetEventName("");
        SetInstruction("");
        SetOverview("");
        SetVenue("");
        SetPhoto("");
      });
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Event Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => {
            SetEventName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Event Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={eventDescription}
          onChange={(e) => {
            SetEventDescription(e.target.value);
          }}
        ></textarea>
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Event overview
        </label>
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Overview"
          aria-label=".form-control-lg example"
          value={overview}
          onChange={(e) => {
            SetOverview(e.target.value);
          }}
        />

        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Instruction
        </label>
        <div className="form-floating">
          <textarea
            className="form-control"
            id="floatingTextarea2"
            value={instruction}
            onChange={(e) => {
              SetInstruction(e.target.value);
            }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Instruction</label>
        </div>

        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Event Address
        </label>
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGrid"
                value={address}
                onChange={(e) => {
                  SetAddress(e.target.value);
                }}
              />
              <label htmlFor="floatingInputGrid">Address</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGrid"
                value={venue}
                onChange={(e) => {
                  SetVenue(e.target.value);
                }}
              />
              <label htmlFor="floatingInputGrid">Venue</label>
            </div>
          </div>
        </div>
        <br />
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupFile01">
            Upload
          </label>
          <input
            type="file"
            class="form-control"
            id="inputGroupFile01"
            value={photo}
            
            onChange={(e) => {
              SetPhoto(e.target.value);
            }}
          />
        </div>

        <div className="button-test">
          <button className="btn-primary" onClick={save}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Events;
