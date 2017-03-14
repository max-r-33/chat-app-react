import {combineReducers} from 'redux';
import storeUser from './ducks/userDuck';
import storeRoom from './ducks/roomDuck';

export default combineReducers({
    storeUser,
    storeRoom
});
