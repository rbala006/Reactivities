import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityDetails from "../details/ActivityDetails";
import ActivityList from "./ActivityList";
import ActivityForm from "../form/ActivityForm";
import ActivityStore from "../../../app/stores/activityStore";

export const ActivityDashboard: React.FC= () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, activity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
