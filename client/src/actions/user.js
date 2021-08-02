import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import {setStudent, setStudentObjects, setStudentTeachers} from "../reducers/studentReducer"
import {API_URL} from "../config";
import {setGroups, setObjects, setTeacher, addGroup, addObject} from "../reducers/teacherReducer";
import {addLesson, delLesson, setLesson, setMarks, setTimetable} from "../reducers/lessonReducer";
import {setGroup, setGroupList, setList} from "../reducers/groupReducer";


export const registration = async (login, password, passwordNew) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            login,
            password,
            passwordNew
        })
    } catch (e) {
        alert(e.response.data.message)

    }
}

export const logIn =  (login, password) => {

    return async dispatch => {
        try {
            const responseU = await axios.post(`${API_URL}api/auth/login`, {
                login,
                password
            })
            dispatch(setUser(responseU.data.user))
            localStorage.setItem('token', responseU.data.token)
            if (responseU.data.user.role==="teacher"){
                const responseT = await axios.get(`${API_URL}api/user/teacher`,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                dispatch(setTeacher(responseT.data.teacher))
                dispatch(setObjects(responseT.data.objects))
                dispatch(setGroups(responseT.data.groups))
            } else {
                const responseS = await axios.get(`${API_URL}api/user/student`,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                dispatch(setStudent(responseS.data.student, responseS.data.group))
            }
        } catch (e) {
             alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            if (response.data.user.role==="teacher"){
                const responseT = await axios.get(`${API_URL}api/user/teacher`,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                await dispatch(setTeacher(responseT.data.teacher))
                await dispatch(setObjects(responseT.data.objects))
                await dispatch(setGroups(responseT.data.groups))
            } else {
                const responseS = await axios.get(`${API_URL}api/user/student`,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                dispatch(setStudent(responseS.data.student, responseS.data.group))
            }
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}






export const getGroup =  (group) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/group`, {group})
            dispatch(setGroupList(response.data.groupList))
            dispatch(setGroup(response.data.group))
        } catch (e) {
            alert(e.response.data.message)

        }
    }
}

export const getMarks =  (lesson) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/lessons/marks`, {lesson})
            dispatch(setMarks(response.data.marks))
        } catch (e) {
            alert(e.response.data.message)

        }
    }
}

export const getGroups =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/user/groups`, {})
            dispatch(setList(response.data.groups))
        } catch (e) {
            alert(e.response.data.message)

        }
    }
}
export const getObjects =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/user/objects`, {})
            dispatch(setList(response.data.objects))
        } catch (e) {
            alert(e.response.data.message)

        }
    }
}

export const addNewGroup = (group) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/addgroup`, {group})
            dispatch(addGroup(response.data.group))
        } catch (e) {
            alert(e.response.data.message)

        }
    }}

export const addNewObject = (object) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/addobject`, {object})
            dispatch(addObject(response.data.object))
        } catch (e) {
            alert(e.response.data.message)
        }
    }}


export const addMarks =  async (marks) => {
        try {
            const response = await axios.post(`${API_URL}api/user/marks`, {marks})
            console.log(response.data.message)
        } catch (e) {
            alert(e.response.data.message)

        }
    }


export const changeLesson = (lesson) => {
    return async dispatch => {
    try {
        const response = await axios.post(`${API_URL}api/user/changelesson`, {lesson})
        dispatch(setLesson(response.data.lessons))
    } catch (e) {
        alert(e.response.data.message)
    }
}}

export const deleteLesson = (type, lesson) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/user/lesson?type=${type}&id=${lesson}`)
            dispatch(delLesson(lesson))
            alert(response.data.message)
        } catch (e) {
            alert(e.response.data.message)
        }
    }}

export const createPlanLesson =  (day, group, teacher, object) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/planlesson`, {day, group, teacher, object})
            dispatch(addLesson(response.data.planLesson))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const createLessons =  (day, date, teacher) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/lesson`, {day, date, teacher})
            const lessons = response.data.lessons
            for (let lesson of lessons) {
                dispatch(addLesson(lesson))
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}



export const getStudentMarks =  (lessons, student) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/student/lessons/marks`, {lessons, student})
            dispatch(setMarks(response.data.marks))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}


export const getLessons =  (sort, day, date) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/user/teacher/lessons?sort=${sort}&day=${day}&date=${date}`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setTimetable(response.data.plans))
            dispatch(setLesson(response.data.planLessons))
        } catch (e) {
            alert(e.response.data.message)

        }
    }
}
export const getStudentLessons =  (sort, day, date) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/user/student/lessons?sort=${sort}&day=${day}&date=${date}`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setTimetable(response.data.plans))
            dispatch(setStudentObjects(response.data.objects))
            dispatch(setStudentTeachers(response.data.teachers))
            dispatch(setLesson(response.data.planLessons))
            dispatch(setMarks(response.data.marks))
        } catch (e) {
            alert(e.response.data.message)

        }
    }
}