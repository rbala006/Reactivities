import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../Modal/Activity";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable activity: IActivity | null = null;
  @observable loadingInitial = true;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    
    return this.groupActivitesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitesByDate(activities: IActivity[]) {
    const sortedActivties = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime() 
    )
    return Object.entries(sortedActivties.reduce((activities,activity)=>{
const date=activity.date.toISOString().split('T')[0];
activities[date]=activities[date] ? [...activities[date],activity]:[activity];
return activities;
    },{} as {[key:string]:IActivity[]})
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach(activity => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
      
    } catch (error) {
      console.log(error);
      runInAction("loading activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = false;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          activity.date=new Date(activity.date);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        })
        return activity;
      } catch (error) {
        runInAction("getting activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Create activities", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;        
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("Create activities error", () => {
        this.submitting = false;
        toast.error('Problem Submitting Data');
        console.log(error);
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("Edit activities", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("Edit activities Error", () => {
        this.submitting = false;
        toast.error('Problem Submitting Data');
        console.log(error);
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("Delete activities", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("Delete activities error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };
}

export default createContext(new ActivityStore());
