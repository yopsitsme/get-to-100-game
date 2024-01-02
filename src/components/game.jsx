import React, { useState } from "react";
import "./game.css";
export default function Game(props) {
  const [operatorsState, setOperatorsState] = useState(
    Math.floor(Math.random() * 9) + 90
  );
  const [numberSteps, setnumberSteps] = useState(0);
  const [winner, setWinner] = useState(false);
  const operators = ["+1", "-1", "*2", "/2"];

  const operatorsButton = operators.map((operators, key) => {
    console.log(props.currentPlayerIndex);
    return (
      <button
        key={key}
        disabled={ props.currentGameUsers[props.currentPlayerIndex].email === props.user.email? false: true }
        value={operators}
        onClick={operatorsHandel}
      >
        {operators}
      </button>
    );
  });

  function operatorsHandel(e) {
    let operator = e.target.value;
    let currentValue = Math.floor(eval(operatorsState + operator));
    setOperatorsState(currentValue);
    setnumberSteps(numberSteps + 1);
    if (
      props.currentPlayerIndex ===
      localStorage.getItem("numberCurrentGameUsers") - 1
    ) {
      props.setCurrentPlayerIndex(0);
    } else {
      props.setCurrentPlayerIndex(props.currentPlayerIndex + 1);
    }
    if (currentValue === 100) {
      let users = JSON.parse(localStorage.getItem("users"));
      let tempUsers = users.map((user1) => {
        if (props.user.email === user1.email) {
          user1.steps.push(numberSteps + 1);
        }
        return user1;
      });
      localStorage.setItem("users", JSON.stringify(tempUsers));
      setWinner(true);
      setnumberSteps(0);
    }
  }
  function exitHandler() {
    let array = JSON.parse(localStorage.getItem("currentGameUsers"));
    let tempCurrentGameUsers = array.filter((currentName) => {
      return currentName.email !== props.user.email;
    });
    localStorage.setItem(
      "currentGameUsers",
      JSON.stringify(tempCurrentGameUsers)
    );
    localStorage.setItem(
      "numberCurrentGameUsers",
      JSON.stringify(tempCurrentGameUsers.length)
    );
    console.log(tempCurrentGameUsers);
    props.setCurrentGameUsers(tempCurrentGameUsers);
    setWinner(false);
    if(props.currentPlayerIndex===0){
      props.setCurrentPlayerIndex(props.currentPlayerIndex);   
     }
    else{
      props.setCurrentPlayerIndex(props.currentPlayerIndex - 1);
    }
  }
  function newGame() {
    setWinner(false);
    setOperatorsState(Math.floor(Math.random() * 9) + 90);
  }

  return (
    <div className="gameDiv">
      <h3>{props.user.name}</h3>
      {!winner && <p>מספר צעדים: {numberSteps}</p>}
      {!winner && operatorsState}
      <div className="opretionBtn">{!winner && operatorsButton}</div>
      {winner && <h3>ניצחת!!!!!!</h3>}
      {winner && <button onClick={exitHandler}>יציאה</button>}
      {winner && <button onClick={newGame}>משחק חדש</button>}
    </div>
  );
}
