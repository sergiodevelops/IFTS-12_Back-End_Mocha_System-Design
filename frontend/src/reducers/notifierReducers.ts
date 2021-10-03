import { ENQUEUE_NOTIFICATION, CLOSE_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notifierActions';
import Notification from "../models/Notification";

type actionProps = {
    type: string,
    payload: {
        notification: Notification,
        dismissAll?: boolean,
        key?: string
    }
}

export default (state: Notification[] = [], action: actionProps) => {
    switch (action.type) {
        case ENQUEUE_NOTIFICATION:
            return [...state, {...action.payload.notification}];

        case CLOSE_NOTIFICATION:
            return state.map((notification: Notification) => {
                if (action.payload.dismissAll || notification.key === action.payload.key) return { ...notification, dismissed: true };
                else return notification;
            });

        case REMOVE_NOTIFICATION:
            return state.filter((notification: Notification) => notification.key !== action.payload.key);

        default:
            return state;
    }
};
