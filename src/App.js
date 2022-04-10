import React, { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import RegistarModal from "./components/RegistarModal";

function App() {
  const [player, setPlayer] = useState(false);
  const [name, setName] = useState("");

  const setPlayerCallback = (name) => {
    setName(name);
    setPlayer(true);
  };

  const newPlayerCallback = () => {
    setName("");
    setPlayer(false);
  };

  let playerModal;
  if (!player) {
    playerModal = (
      <RegistarModal playerCallback={(name) => setPlayerCallback(name)} />
    );
  }

  let game;
  if (player) {
    game = (
      <Game
        playerName={name}
        changePlayerCallback={() => newPlayerCallback()}
      />
    );
  }

  return (
    <div className="App">
      {game}
      {playerModal}
    </div>
  );
}

export default App;
