import { useState } from "react";
import "./App.css";
import LogIn from "./components/logIn";
import AnotherPlayer from "./components/anotherPlayer";
import GameBoard from "./components/gameBoard";


function App() {
  const [logIn, setLogIn] = useState(true);
  const [anotherPlayer, setAnotherPlayer] = useState(false);
  const [game, setGame] = useState(false);
  if (localStorage.getItem("numberOfUsers") === null) {
    localStorage.setItem("currentGameUsers", JSON.stringify([]));
    localStorage.setItem("numberCurrentGameUsers", JSON.stringify(0));
    localStorage.setItem("numberOfUsers", JSON.stringify(0));
    localStorage.setItem("users", JSON.stringify([]));
  }
 
  
  
  return (
    <>
      {logIn && (
        <LogIn
          setLogIn={setLogIn}
          setAnotherPlayer={setAnotherPlayer}
        />
      )}
      {anotherPlayer && (
        <AnotherPlayer
        setLogIn={setLogIn}
        setAnotherPlayer={setAnotherPlayer}
        setGame={setGame}
        />
        )}
      {game&& <GameBoard
      setGame={setGame}
      setLogIn={setLogIn}
      />}
    </>
  );
}

export default App;
