import { Activity } from "./activity";

export interface Location {
    _id?: string; // Optional _id field
    address: {
        street: String;
        postalcode: Number;
        city: String;
    };
    activity: Activity; //reference to activity
}