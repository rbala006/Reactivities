export interface IActivity {
    id: string;
    title: String;
    description: string;
    category: string;
    date: Date;
    time: Date;
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined;
    title: String = '';
    description: string = '';
    category: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date;
        }
        Object.assign(this, init);
    }
}