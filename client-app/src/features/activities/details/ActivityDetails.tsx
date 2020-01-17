import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Modal/Activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";


interface IProps{
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity:IActivity | null)=> void;
}

export const ActivityDetails: React.FC<IProps> = ({setEditMode,setSelectedActivity}) => {
  const activityStore = useContext(ActivityStore);
  const {  selectedActivity: activity } = activityStore;
  return (
    <div>
      <Card fluid>
        <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group>
              <Button onClick={()=> setEditMode(true)} basic color='blue' content='Edit'></Button>
              <Button onClick={()=> setSelectedActivity(null)} basic color='blue' content='Cancel'></Button>
          </Button.Group>
        </Card.Content>
      </Card>
      
    </div>
  );
};
export default observer(ActivityDetails);