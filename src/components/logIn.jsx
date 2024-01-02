import React, { useState } from "react";
import "./LogIn.css";

export default function LogIn({
  setAnotherPlayer,
  setLogIn,
}) {
  const [option, setOption] = useState(1);
  function signHandel(e) {
    e.preventDefault();
    let isUserAdded = false;
    if (option === 1) {
      let saveEmail = document.getElementById("email").value;
      let savePassword = document.getElementById("password").value;
      let isCorrect = false;
      let added = false;
      let users = JSON.parse(localStorage.getItem("users"));
      let CurrentGameUserArr = JSON.parse(
        localStorage.getItem("currentGameUsers")
      );
      for (let i = 0; i < localStorage.getItem("numberOfUsers"); i++) {
        if (
          users[i].email === saveEmail &&
          users[i].password === savePassword
        ) {
          added = true;
          for (
            let j = 0;
            j < localStorage.getItem("numberCurrentGameUsers");
            j++
          ) {
            if (CurrentGameUserArr[j].email === saveEmail) {
              isCorrect = false;
              alert("המשתמש כבר רשום במשחק זה, נא לחבר משתמש אחר");
              break;
            } else {
              isCorrect = true;
            }
          }
        }
        if (isCorrect || localStorage.getItem("numberCurrentGameUsers") == 0) {
          CurrentGameUserArr.push(users[i]);
          localStorage.setItem(
            "currentGameUsers",
            JSON.stringify(CurrentGameUserArr)
          );
     
            let numberCurrentGameUsers=(localStorage.getItem("numberCurrentGameUsers"))
          numberCurrentGameUsers++;
          localStorage.setItem(
            "numberCurrentGameUsers",
            numberCurrentGameUsers
          );
          isUserAdded = true;
          break;
        }
      }
      if (!added) {
        alert("שם משמש או סיסמא שגויים");
      }
    } else {
      let saveName = document.getElementById("name").value;
      let saveEmail = document.getElementById("email").value;
      let savePassword = document.getElementById("password").value;
      let repeat_password = document.getElementById("repeat-password").value;
      if (savePassword !== repeat_password) {
        alert("הסיסמאות אינן תואמות");
        flag = false;
      }
      let users = JSON.parse(localStorage.getItem("users"));
      let flag = true;
      for (let i = 0; i < localStorage.getItem("numberOfUsers"); i++) {
        if (users[i].email === saveEmail) {
          alert("משתמש קיים,יש להתחבר");
          flag = false;
        }
      }
      if (flag) {
        let user = {
          name: saveName,
          email: saveEmail,
          password: savePassword,
          steps: [],
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        let numberOfUsers = localStorage.getItem("numberOfUsers");
        numberOfUsers++;
        localStorage.setItem("numberOfUsers", numberOfUsers);
        let CurrentGameUserArr = JSON.parse(
          localStorage.getItem("currentGameUsers")
        );
        CurrentGameUserArr.push(user);
        localStorage.setItem(
          "currentGameUsers",
          JSON.stringify(CurrentGameUserArr)
        );

        let numberCurrentGameUsers=(localStorage.getItem("numberCurrentGameUsers"))
        numberCurrentGameUsers++;
        localStorage.setItem(
          "numberCurrentGameUsers",
          numberCurrentGameUsers
        );
        isUserAdded = true;
      }
    }
    if (isUserAdded) {
      setLogIn(false);
      setAnotherPlayer(true);
    }
  }

  return (
    <div className="container">
      <header>
        <div className={"header-headings"}>
          {option === 1 && <span>Sign in to your account</span>}
          {option === 2 && <span>Create an account</span>}
        </div>
      </header>
      <ul className="options">
        <li
          className={option === 1 ? "active" : ""}
          onClick={() => setOption(1)}
        >
          Sign in
        </li>
        <li
          className={option === 2 ? "active" : ""}
          onClick={() => setOption(2)}
        >
          Sign up
        </li>
      </ul>
      <form className="account-form">
        <div className={"account-form-fields "}>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="name"
            required
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          {option === 2 && (
            <input
              id="repeat-password"
              name="repeat-password"
              type="password"
              placeholder="Repeat password"
              required
            />
          )}
        </div>
        <button onClick={signHandel} className="btn-submit-form" type="submit">
          {option === 1 ? "Sign in" : "Sign up"}
        </button>
      </form>
    </div>
  );
}
