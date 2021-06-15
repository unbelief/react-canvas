import React from "react";
import { Scene, Text, Image } from "react-canvas";
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
    </Scene>
  );
}

export default App;
