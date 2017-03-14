
const ADD_ROOM = 'ADD_ROOM';
const LEAVE_ROOM = 'LEAVE_ROOM';


export function addRoom(name){
    return {type: ADD_ROOM, name};
}

export function leaveRoom(){
    return {type: LEAVE_ROOM}
}

export default function reducer(state = {}, action = {}){
    switch(action.type){
        case ADD_ROOM:
            return Object.assign({}, state, {name: action.name});
        case LEAVE_ROOM:
            return Object.assign({}, state, {});
        default:
            return state;
    }
}
