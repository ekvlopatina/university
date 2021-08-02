const SET_STUDENT = "SET_STUDENT"
const SET_OBJECT = "SET_OBJECT"
const SET_TEACHERS = "SET_TEACHERS"


const defaultState = {
    currentStudent: {},
    currentGroup: {},
    object: [],
    teachers: []
}

export default function studentReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_STUDENT:
            return {
                ...state,
                currentStudent: action.payload.student,
                currentGroup: action.payload.group
            }
        case SET_OBJECT: return {...state, object: action.payload}
        case SET_TEACHERS: return {...state, teachers: action.payload}

        default:
            return state
    }
}


export const setStudent = (student, group) => ({type: SET_STUDENT, payload: {student, group}})
export const setStudentObjects = object => ({type: SET_OBJECT, payload: object})
export const setStudentTeachers = teachers => ({type: SET_TEACHERS, payload: teachers})
