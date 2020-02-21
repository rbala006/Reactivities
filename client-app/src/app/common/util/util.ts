import { IUser } from "../../Modal/User";
import { IActivity } from "../../Modal/Activity";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}

export const setActivityProps = (activity: IActivity, user: IUser) => {    
    activity.date = new Date(activity.date);
    console.log(user);
    activity.isGoing = activity.attendees.some(
        a => a.username === user.userName
    );
    activity.isHost = activity.attendees.some(
        a => a.username === user.userName && a.isHost
    );
    return activity;
}