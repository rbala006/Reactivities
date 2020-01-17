import { observable, action, computed, configure,runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../Modal/Activity";
import agent from "../api/agent";

configure({enforceActions:'always' });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = true;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities',()=>{
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      })
      
    } catch (error) {
      console.log(error);
      runInAction('loading activities error',()=>{
      this.loadingInitial = false;
      });
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('Create activities',()=>{
      this.activityRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
      });
    } catch (error) {
      runInAction('Create activities error',()=>{
      this.submitting = false;
      console.log(error);
    });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('Edit activities',()=>{
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
      });
    } catch (error) {
      runInAction('Edit activities Error',()=>{
      this.submitting = false;
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
      runInAction('Delete activities',()=>{
      this.activityRegistry.delete(id);
      this.submitting = false;
      this.target = "";
      });
    } catch (error) {
      runInAction('Delete activities error',()=>{
      this.submitting = false;
      console.log(error);
      });
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    console.log("B");
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());