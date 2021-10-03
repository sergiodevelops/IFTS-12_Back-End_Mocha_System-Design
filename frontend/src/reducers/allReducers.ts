import { combineReducers } from 'redux';
import layoutReducers from '../reducers/layoutReducers';
import userReducers from '../reducers/userReducers';
import notifierReducers from '../reducers/notifierReducers';
import asistenciaReducers from '../reducers/asistenciaReducers';
import evaluacionReducers from '../reducers/evaluacionReducers';

const rootReducers = combineReducers({
    layout: layoutReducers,
    user: userReducers,
    notifications: notifierReducers,
    asistencia: asistenciaReducers,
    evaluacion: evaluacionReducers
    
});

export default rootReducers;
