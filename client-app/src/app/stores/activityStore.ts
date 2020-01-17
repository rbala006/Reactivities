import { observable, action, configure } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../Modal/Activity';
import agent from '../api/agent';


class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = true;
    @observable editMode = false;
    @observable submitting = false;

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false;
        }
        catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            this.activities.push(activity);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        console.log("A");
        this.editMode = true;
        this.selectedActivity = undefined;
        console.log("B");
    }

    @action selectActivity = (id: string) => {
        
        this.selectedActivity = this.activities.find(a => a.id === id);
        console.log("B");
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())