import React, { Component, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Header, Icon, List, Container } from "semantic-ui-react";
import { IActivity } from "../Modal/Activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";


// interface IState {
//   activities: IActivity[]
// }

// class App extends Component<{},IState> {
//   readonly state: IState = {
//     activities: [],
//   };

//   componentDidMount() {
//     axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
//       this.setState({
//         activities: response.data
//       });
//     });
//   }

//  render() { }

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []);
  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>       
       <ActivityDashboard activities={activities}></ActivityDashboard>
      </Container>
      </Fragment>
  );
};

export default App;
