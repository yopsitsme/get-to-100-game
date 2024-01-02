import React from "react";
export default function AnotherPlayer(props){
    function yesButton(){
        props.setAnotherPlayer(false)
        props.setLogIn(true)
    }
    function noButton(){
        props.setAnotherPlayer(false);
        props.setGame(true)
    }
    return(
        <>
        <h1>😃הצטרפת למשחק</h1>
        <h2>?האם תרצה להוסיף שחקן נוסף</h2>
    <button onClick={yesButton}>כן</button>
    <button onClick={noButton} >התחל במשחק</button>
    </>
    )
}