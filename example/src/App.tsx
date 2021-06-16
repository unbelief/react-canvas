import React from "react";
import { Scene, Text, Image, Table } from "react-canvas";
import "react-canvas/dist/index.css";
import "./index.css";

function App() {
  return (
    <Scene
      attribute={{
        width: 500,
        height: 350,
      }}
    >
      <Text
        attribute={{
          top: 330,
          left: 438,
          width: 150,
          height: 30,
          font: "25px Lato",
          fillStyle: "#fff",
          // border: true,
        }}
        event={{
          type: "click",
          handle: () => {
            console.log("text click");
          },
        }}
        content={"Loading..."}
      />

      <Image
        attribute={{
          top: 120,
          left: 100,
          width: 92,
          height: 33,
        }}
        event={{
          type: "click",
          handle: () => {
            console.log("image click");
          },
        }}
        src={
          "https://www.google.com/logos/doodles/2021/doodle-for-google-2021-us-winner-6753651837109220-s.png"
        }
      />

      <Table
        attribute={{
          top: 385,
          left: 250,
          width: 500,
          height: 300,
          border: true,
        }}
        summary={[
          { key: "No." },
          { key: "Name" },
          { key: "Age" },
          { key: "From" },
        ]}
        data={[
          { name: "jack", age: 20, from: "UK" },
          { name: "Sam", age: 22, from: "US" },
        ]}
      />
    </Scene>
  );
}

export default App;
