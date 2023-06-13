import React, { useState, useEffect } from "react";
import ControlPanel from "../Components/ControlPanel";
import Swal from "sweetalert2";

function Homepage() {
  const [positionX, setPositionX] = useState(1);
  const [positionY, setPositionY] = useState(1);
  const [instruction, setInstruction] = useState([]);
  const [logicPanel, setLogicPanel] = useState(Array(14).fill(null));

  const check = () => {
    if (positionX === 5 && positionY === 5) {
      console.log(1);
      setInstruction([]);
      Swal.fire({
        title: "YOU WON!!",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
      setPositionX(1);
      setPositionY(1);
      setLogicPanel(Array(14).fill(null));
    }
  };
  const fetchInstruction = async (symbol) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/instruction/${symbol}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      let x = positionX;
      let y = positionY;
      console.log("symbol is ", symbol, positionX, positionY);
      if (symbol === "left") {
        x = x - 1;
      } else if (symbol === "up") {
        y = y - 1;
      } else if (symbol === "down") {
        y = y + 1;
      } else if (symbol === "right") {
        x = x + 1;
      }
      if (x === 5 && y === 5) {
        setInstruction([]);
      } else {
        setInstruction((e) => [...e, data.instruction]);
      }
      setPositionX(x);
      setPositionY(y);
    } catch (error) {
      console.error("Error fetching instruction:", error);
    }
  };

  useEffect(() => {
    check();
    if (positionX === 1 && positionY === 1) {
      setInstruction([]);
    }
  }, [positionX, positionY]);

  return (
    <div>
      <nav className="text-3xl text-white bg-[#190a4d] h-20 items-center flex px-8">
        BUILD
      </nav>
      <div className="flex flex-row justify-around items-center mt-10">
        <div className="flex">
          {/* Render the 5x5 grid */}
          <div className="grid w-[500px] h-[500px] p-[5px] gap-[5px] grid-cols-5 grid-rows-5">
            {Array.from({ length: 25 }).map((_, index) => (
              <div key={index} className="bg-[#ffc700]"></div>
            ))}
            {/* Render the robot */}
            <div
              className="bg-[#ffc700]"
              style={{ gridRow: positionY, gridColumn: positionX }}
            >
              <img
                src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/robo-removebg-preview.png"
                alt=""
              />
            </div>
            {/* Render the end square */}
            <div
              className="bg-[#f00]"
              style={{ gridColumn: "5", gridRow: "5" }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col p-10 w-[600px]">
          <div className="text-white underline text-3xl bg-[#5a6bff] w-full h-[50px] p-7 flex items-center">
            Instructions Implemented
          </div>
          <div className="flex text-white bg-[#190a4d] w-full h-[433px] p-7 flex-col">
            {instruction.map((e) => (
              <div className="w-full">{e}</div>
            ))}
          </div>
        </div>
      </div>

      <ControlPanel
        positionX={positionX}
        positionY={positionY}
        setPositionX={setPositionX}
        setPositionY={setPositionY}
        fetchInstruction={fetchInstruction}
        setInstruction={setInstruction}
        logicPanel={logicPanel}
        setLogicPanel={setLogicPanel}
      />
    </div>
  );
}

export default Homepage;
