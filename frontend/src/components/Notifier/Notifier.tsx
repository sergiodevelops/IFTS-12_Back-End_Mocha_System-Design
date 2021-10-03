import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, VariantType } from 'notistack';
import { notifierActions } from '../../actions/allActions';
import Notification from "../../models/Notification";

let displayed: string[] = [];

type storeProps = {
    notifications: Notification[] 
}

export default function Notifier(): null {
    const POSITION_VERTICAL = 'top';
    const POSITION_HORIZONTAL = 'right';
    const DURATION = 5000; 

    const notifications = useSelector((state: storeProps) => state.notifications);

    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id: string) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id: string) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    const getNotificationType = (type: string) => {
        let notificationType: VariantType;

        switch(type) {
            case 'success':
                notificationType = "success";
            break;
            case 'info':
                notificationType = "info";
            break;
            case 'error':
                notificationType = "error";
            break;
            case 'warning':
                notificationType = "warning";
            break;
            default:
                notificationType = "default";
            break;
        }

        return notificationType;
    }

    useEffect(() => {
        notifications.forEach(({ key, message, title, type, dismissed}: Notification) => {
            const notificationType = getNotificationType(type);
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                variant: notificationType,  
                anchorOrigin: { 
                    vertical: POSITION_VERTICAL, 
                    horizontal: POSITION_HORIZONTAL 
                },
                autoHideDuration: DURATION,
                onExited: (event, keyRemoved) => {
                    const keySnackbarRemoved = keyRemoved.toString();
                    // removen this snackbar from redux store
                    dispatch(notifierActions.removeNotification(keySnackbarRemoved));
                    removeDisplayed(keySnackbarRemoved);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    return null;
};
