import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match, history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    openEditForm,
    cancelSelectedActivity,
    loadActivity,
    loadingInitial
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  },[loadActivity,match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading Activity..." />;
  return (
    <div>
      <Card fluid>
        <Image
          src={`/assets/categoryImages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group>
            <Button
              as ={Link} to={`/manage/${activity.id}`}
              basic
              color="blue"
              content="Edit"
            ></Button>
            <Button
              onClick={()=> history.push("/activities")}
              basic
              color="blue"
              content="Cancel"
            ></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </div>
  );
};
export default observer(ActivityDetails);
