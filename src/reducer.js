import {combineReducers} from 'redux';
import user from './ducks/userDuck';
import room from './ducks/roomDuck';

export default combineReducers({
    user,
    room
});
