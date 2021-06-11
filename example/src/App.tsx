import React from "react";
import { Scene, Text, Image } from "react-canvas";
import "react-canvas/dist/index.css";
import "./index.css";

function App() {
  return (
    <Scene
      attribute={{
        width: "500px",
        height: "350px",
        // cursor: "default",
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
          border: true,
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
          left: 60,
          width: 350,
          height: 360,
          border: 1,
        }}
        event={{
          type: "click",
          handle: () => {
            console.log("image click");
          },
        }}
        src={
          "https://cdn2.jianshu.io/assets/default_avatar/5-33d2da32c552b8be9a0548c7a4576607.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96"
        }
      />
    </Scene>
  );
}

export default App;
