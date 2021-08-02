const SET_GROUP = "SET_GROUP"
const SET_LIST = "SET_LIST"
const SET_CHANGE_MARKS = "SET_CHANGE_MARKS"
const ADD_CHANGE_MARKS = "ADD_CHANGE_MARKS"
const SET_LIST_OBJECTS = "SET_LIST_OBJECTS"



const defaultState = {
    currGroup: {},
    groupList: [],
    changeMarks: [],
    list: []

}

export default function groupReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_GROUP: return {...state, currGroup: action.payload}
        case SET_LIST: return {...state, groupList: action.payload}
        case SET_LIST_OBJECTS: return {...state, list: action.payload}
        case SET_CHANGE_MARKS: return {...state, changeMarks: action.payload}
        case ADD_CHANGE_MARKS: return {...state, changeMarks: [...state.changeMarks, action.payload]}

        default:
            return state
    }
}

export const setGroup = (group) => ({type: SET_GROUP, payload: group})
export const setGroupList = (groupList) => ({type: SET_LIST, payload: groupList})
export const setChangeMarks = (changeMarks) => ({type: SET_CHANGE_MARKS, payload: changeMarks})
export const addChangeMarks = (changeMarks) => ({type: ADD_CHANGE_MARKS, payload: changeMarks})
export const setList = (list) => ({type: SET_LIST_OBJECTS, payload: list})


