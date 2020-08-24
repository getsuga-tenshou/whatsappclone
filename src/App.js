import React , {useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import { useStateValue } from "./StateProvider";

function App() {

  const [{user}, dispatch ] = useStateValue();

  
  return (
    
    <div className="App">
      {!user ? (
        <Login />
      ) : (
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/chatRooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      )};
    </div> 
  );
}

export default App;
