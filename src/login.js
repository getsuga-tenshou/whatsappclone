import React from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {

    const[{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
      })
    } )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="loginBody">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png"
          alt=""
        />
        <div className="loginText">
          <h1>Sign in to this app</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
