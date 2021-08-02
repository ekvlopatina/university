const SET_LESSON = "SET_LESSON"
const SET_TIMETABLE = "SET_TIMETABLE"
const ADD_LESSON = "ADD_LESSON"
const SET_MARKS = "SET_MARKS"
const DELETE_LESSON = "DELETE_LESSON"

const defaultState = {
    lessons: [],
    timetable: [],
    marks: []
}

export default function lessonReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LESSON: return {...state, lessons: action.payload}
        case ADD_LESSON:return {...state, lessons: [...state.lessons, action.payload]}
        case DELETE_LESSON:return {...state, lessons: [...state.lessons.filter(lesson => lesson._id !== action.payload)]}
        case SET_TIMETABLE: return {...state, timetable: action.payload}
        case SET_MARKS: return {...state, marks: action.payload}

        default:
            return state
    }
}

export const setLesson = (lessons) => ({type: SET_LESSON, payload: lessons})
export const setTimetable = (timetable) => ({type: SET_TIMETABLE, payload: timetable})
export const setMarks = (marks) => ({type: SET_MARKS, payload: marks})
export const addLesson = (lesson) => ({type: ADD_LESSON, payload: lesson})
export const delLesson = (lesson_id) => ({type: DELETE_LESSON, payload: lesson_id})
