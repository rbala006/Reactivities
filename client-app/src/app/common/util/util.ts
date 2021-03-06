import { IUser } from "../../Modal/User";
import { IActivity, IAttendee } from "../../Modal/Activity";

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

    activity.isGoing = activity.attendees.some(
        a => a.username === user.userName
    );
    activity.isHost = activity.attendees.some(
        a => (a.username === user.userName && a.isHost)
    );
    return activity;
}

export const createAttendee = (user: IUser): IAttendee => {
    return {
        username: user.userName,
        displayname: user.displayName,
        image: user.image!,
        isHost: false                
    }
}