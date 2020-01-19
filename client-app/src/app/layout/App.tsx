import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../features/nav/NavBar";

import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

import ActivityForm from "../../features/activities/form/ActivityForm";
import { HomePage } from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  
  return (
    <Fragment>
      <Route exact path="/" component={HomePage}></Route>
      <Route path={'/(.+)'} render={()=>(
        <Fragment>
<NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>      
        <Route exact path="/activities" component={ActivityDashboard}></Route>
        <Route path="/activities/:id" component={ActivityDetails}></Route>
        <Route
          key={location.key}
          path={["/createActivity", "/manage/:id"]}
          component={ActivityForm}
        ></Route>
      </Container>
        </Fragment>
      )}
      ></Route>
    </Fragment>
  );
};

export default withRouter(observer(App));
