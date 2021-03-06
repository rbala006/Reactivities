import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedSideBar } from "./ActivityDetailedSideBar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  if (!activity) return <h2>Activity Not Found</h2>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
        <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
        <ActivityDetailedChat></ActivityDetailedChat>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar attendees={activity.attendees}></ActivityDetailedSideBar>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDetails);
