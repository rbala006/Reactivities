import React, { useContext } from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/Modal/Activity";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";
import { link } from "fs";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  // const rootStore = useContext(RootStoreContext);
  // const { deleteActivity, submitting, target } = rootStore.activityStore;
  const host = activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by {host.displayname}</Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="You are hosting this activity"
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="You are going to this activity"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {format(activity.date, "h:mm a")}
        <Icon name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
        {/* <Button
          name={activity.id}
          loading={target === activity.id && submitting}
          onClick={e => deleteActivity(e, activity.id)}
          floated="right"
          content="Delete"
          color="red"
        /> */}
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
