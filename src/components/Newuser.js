import React from "react";
const Newuser = () => {
  const [data, SetData] = React.useState({ name: "Atul Sharma", age: "23" });
  return (
    <div className="container">
      <div className="newuser">
        <h2>New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => {
            SetData({ ...data, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Age"
          value={data.age}
          onChange={(e) => {
            SetData({ ...data, age: e.target.value });
          }}
        />

        <h1>{data.name}</h1>
        <h1>{data.age}</h1>
      </div>
    </div>
  );
};
export default Newuser;
