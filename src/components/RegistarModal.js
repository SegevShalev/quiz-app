import React, { useState } from "react";
import "../styles/RegisterComp.css";
import Modal from "react-modal";

export default function RegistarModal(props) {
  Modal.setAppElement("#portal");

  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Your Name");

  const setPlayer = () => {
    if (name.length > 0) {
      props.playerCallback(name);
      return;
    }
    setPlaceholder("You MUST enter your name! ");
  };

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
            background: "",
            position: "absolute",
            top: "100px",
            left: "400px",
            right: "400px",
            bottom: "400px",
            border: "1px solid #ccc",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={true}
      >
        <div className="container">
          <h1 className="h1-register-modal">WELCOME to Quiz App</h1>
          <br />
          <label className="input-field">
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <span className="placeholder">{placeholder}</span>
          </label>{" "}
          <br />
          <button className="btn-register-modal" onClick={() => setPlayer()}>
            <span role="img" aria-label="Backhand Index Pointing Up">
              Start The Game 👆
            </span>{" "}
          </button>
          <div className="question-mark-left">
            {" "}
            <span role="img" aria-label="Man shruggin">
              🤷‍♂️
            </span>{" "}
          </div>
          <div className="question-mark-right">
            {" "}
            <span role="img" aria-label="Woman shruggin">
              🤷‍♀️
            </span>{" "}
          </div>
        </div>
      </Modal>
    </div>
  );
}
