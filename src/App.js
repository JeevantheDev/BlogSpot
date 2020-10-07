import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import Signin from "./components/auth/Signin";
import CreateProject from "./components/projects/CreateProject";
import UpdateProject from "./components/projects/UpdateProject";
import SavedDetails from "./components/projects/SavedDetails";
import Alertbar from "./components/layout/Alertbar";
// import M from "materialize-css";
import { useEffect } from "react";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Alertbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/projects/:id/:slug" component={ProjectDetails} />
          <Route path="/saved/:id" component={SavedDetails} />
          <Route path="/projectUpdate/:id/:slug" component={UpdateProject} />
          <Route path="/signin" component={Signin} />
          <Route path="/create" component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
