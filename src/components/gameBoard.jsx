import React, { useState } from "react";
import LeadsPlayers from "./LeadsPlayers";
import "./game.css";
import Game from "./game";
export default function GameBourde(props) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentGameUsers, setCurrentGameUsers] = useState(
    JSON.parse(localStorage.getItem("currentGameUsers"))
  );
  function addPleywrButtonHandler(e) {
    props.setGame(false);
    props.setLogIn(true);
  }

  function exitAllPlayer() {
    localStorage.setItem("currentGameUsers", JSON.stringify([]));
    localStorage.setItem("numberCurrentGameUsers", JSON.stringify(0));
    props.setGame(false);
    props.setLogIn(true);
  }
  return (
    <div>
      <button className="addPlayer" onClick={addPleywrButtonHandler}>
        להוספת שחקן
      </button>
      <button className="exitAllPlayer" onClick={exitAllPlayer}>
        ליציאת כל השחקנים
      </button>
      <div className="header">
        <h1>get</h1>
        <h1>2️⃣🎯1️⃣0️⃣0️⃣</h1>
      </div>
      <LeadsPlayers />
      <div className="allGamesDiv">
        {currentGameUsers.map((user, key) => (
          <Game
            key={user.email}
            playIndex={key}
            user={user}
            setCurrentPlayerIndex={setCurrentPlayerIndex}
            currentPlayerIndex={currentPlayerIndex}
            setCurrentGameUsers={setCurrentGameUsers}
            currentGameUsers={currentGameUsers}
          />
        ))}
      </div>
    </div>
  );
}
