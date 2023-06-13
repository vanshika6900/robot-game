import React, { useState } from "react";
import Swal from "sweetalert2";

function ControlPanel({
  onSymbolDrop,
  positionX,
  positionY,
  setPositionY,
  setPositionX,
  fetchInstruction,
  setInstruction,
  logicPanel,
  setLogicPanel,
}) {
  const [symbols, setSymbols] = useState(["left", "up", "down", "right"]);
  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);
  // const handleDragStart = (e, number) => {
  //   e.dataTransfer.setData("text/plain", number);
  // };
  const handleDrop = (index, symbol) => {
    const updatedLogicPanel = [...logicPanel];
    updatedLogicPanel[index] = symbol;
    setLogicPanel(updatedLogicPanel);
  };

  const handleDragStart = (e, symbol) => {
    if (play) {
      e.dataTransfer.setData("symbol", symbol);
    } else {
      Swal.fire({
        icon: "warning",
        title: "START GAME BY CLICKING ON PLAY BUTTON",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropZoneDrop = (e, index) => {
    const symbol = e.dataTransfer.getData("symbol");
    if (
      (symbol === "left" && positionX === 1) ||
      (symbol === "up" && positionY === 1) ||
      (symbol === "down" && positionY === 5) ||
      (symbol === "right" && positionX === 5)
    ) {
      Swal.fire({
        icon: "error",
        title: "INVALID OPERATION",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      handleDrop(index, symbol);
      fetchInstruction(symbol);
      onSymbolDrop(symbol);
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-[#5a6bff] text-white p-7 w-full justify-between">
        <div className="text-3xl mb-5">Logic Panel</div>
        <div className="flex">
          {/* Render the row of boxes */}
          <div className="flex">
            {logicPanel.map((symbol, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[50px] h-[50px] bg-[#ccc] mr-[10px] rounded-[3px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropZoneDrop(e, index)}
              >
                <i
                  class={`bi bi-arrow-${symbol} text-3xl font-bold text-black`}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row p-10 cursor-move">
        {symbols.map((symbol, index) => (
          <div
            className="flex items-center justify-center w-[50px] h-[50px] bg-[#ccc] mr-[10px] rounded-[3px]"
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, symbol)}
          >
            <i class={`bi bi-arrow-${symbol} text-3xl font-bold`}></i>
          </div>
        ))}

        <div className="w-[100px] h-[50px] mr-[10px] rounded-[3px] flex items-center flex-row justify-center bg-[#FFC700] text-[#5a6bff] px-7 font-bold cursor-pointer">
          <div
            className="text-2xl"
            onClick={() => {
              setPlay(true);
              Swal.fire({
                icon: "success",
                title: "GAME STARTED",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
            }}
          >
            Play
          </div>
        </div>
        <div
          className="w-[50px] h-[50px] mr-[10px] rounded-[3px] flex items-center flex-row justify-center bg-[#FFC700] text-[#5a6bff] cursor-pointer"
          onClick={() => {
            setLogicPanel(Array(14).fill(null));
            setInstruction([]);
            setPositionX(1);
            setPositionY(1);
            Swal.fire({
              icon: "success",
              title: "GAME RESET",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            class="bi bi-arrow-counterclockwise stroke-2 stroke-[#5a6bff]"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
