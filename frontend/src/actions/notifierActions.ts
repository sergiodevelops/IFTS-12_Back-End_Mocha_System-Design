import Notification from "../models/Notification";
import { keys } from '@material-ui/core/styles/createBreakpoints';

export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

type actionProps = {
    type: string,
    payload: {
        notification?: Notification,
        dismissAll?: boolean,
        key?: string
    }
}

const enqueueNotification = (notification: Notification): actionProps => {
    return {
        type: ENQUEUE_NOTIFICATION,
        payload: {
            notification,
            dismissAll: !keys,
        }
    }
};

const closeNotification = (key: string): actionProps => ({
    type: CLOSE_NOTIFICATION,
    payload: {
        dismissAll: !key, // dismiss all if no key has been defined
        key,
    }
});

const removeNotification = (key: string): actionProps => ({
    type: REMOVE_NOTIFICATION,
    payload: {
        key,
    }
});

export default { enqueueNotification, closeNotification, removeNotification }
