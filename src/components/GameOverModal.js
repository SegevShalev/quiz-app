import React from "react";
import Modal from "react-modal";

export default function GameOverModal(props) {
  Modal.setAppElement("#portal");

  return (
    <div>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient( #004d7a, #008793, #00bf72, #a8eb12)",
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "400px",
            right: "400px",
            bottom: "400px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={true}
      >
        <div>
          Game Over! Your Score is {props.finalScore} 
          <button onClick={() => props.resetGameCallback()}>
            <span role="img" aria-label="Winking Face with Tongue">
              Try Again 😜
            </span>
          </button>
          <button onClick={() => props.changePlayerCallback()}>
          <span role="img" aria-label="Switch">Change Player 🔁</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
