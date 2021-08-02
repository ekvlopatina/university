const SET_TEACHER = "SET_TEACHER"
const SET_OBJECTS = "SET_OBJECTS"
const ADD_OBJECT = "ADD_OBJECT"
const SET_GROUPS = "SET_GROUPS"
const ADD_GROUP = "ADD_GROUP"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"


const defaultState = {
    currentTeacher: {},
    objects: [],
    groups: [],
    popupDisplay: 'none'
}

export default function teacherReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TEACHER: return {...state, currentTeacher: action.payload}
        case SET_OBJECTS: return {...state, objects: action.payload}
        case ADD_OBJECT:return {...state, objects: [...state.objects, action.payload]}
        case SET_GROUPS: return {...state, groups: action.payload}
        case ADD_GROUP:return {...state, groups: [...state.groups, action.payload]}
        case SET_POPUP_DISPLAY: return {...state, popupDisplay: action.payload}
        default:
            return state
    }
}


export const setTeacher = teacher => ({type: SET_TEACHER, payload: teacher})
export const setObjects = objects => ({type: SET_OBJECTS, payload: objects})
export const addObject = object => ({type: ADD_OBJECT, payload: object})
export const setGroups = groups => ({type: SET_GROUPS, payload: groups})
export const addGroup = group => ({type: ADD_GROUP, payload: group})
export const setPopupDisplay = popupDisplay => ({type:SET_POPUP_DISPLAY, payload: popupDisplay})
