import React, { useContext } from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/Modal/Activity";
import { format} from 'date-fns';
import { RootStoreContext } from "../../../app/stores/rootStore";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    deleteActivity,
    submitting,
    target
  } = rootStore.activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src="/assets/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Description>Hosted by Bob</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
        
      </Segment>
      <Segment>
        <Icon name="clock" />
        {format(activity.date,'h:mm a')}
        <Icon name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
        <Button
          name={activity.id}
          loading={target === activity.id && submitting}
          onClick={e => deleteActivity(e, activity.id)}
          floated="right"
          content="Delete"
          color="red"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
