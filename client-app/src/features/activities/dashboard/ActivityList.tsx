import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityListItem } from "./ActivityListItem";
import ActivityStore from "../../../app/stores/activityStore";

export const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>

          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem
                key={activity.id}
                activity={activity}
              ></ActivityListItem>
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};
export default observer(ActivityList);
