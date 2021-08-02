import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";
import lessonReducer from "./lessonReducer";
import groupReducer from "./groupReducer";

const rootReducer = combineReducers({
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    lessons: lessonReducer,
    group: groupReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))