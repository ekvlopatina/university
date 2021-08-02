import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setChangeMarks, setGroup, setGroupList} from "../../reducers/groupReducer";
import {setMarks} from "../../reducers/lessonReducer";
import InputMark from "./inputMark";
import {addMarks, changeLesson} from "../../actions/user";


const Lesson = (props) => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const browserHistory = useHistory()
    const groups = useSelector(state => state.teacher.groups)
    const objects = useSelector(state => state.teacher.objects)
    const plan = useSelector(state => state.lessons.timetable)
    const studentList = useSelector(state => state.group.groupList)
    const marksChange = useSelector(state => state.group.changeMarks)
    const marks = useSelector(state => state.lessons.marks)
    const teacher = useSelector(state => state.teacher.currentTeacher)
    const lesson = props.lessonday.find(item => item._id === id)
    const planLesson = plan.find(item => item._id === lesson.planLesson)
    const group = groups.find(item => item._id === planLesson.group)
    const object = objects.find(item => item._id === planLesson.object)
    const [tema, setTema] = useState(lesson.tema)
    const [homework, setHomework] = useState(lesson.homework)
    const dateStr = lesson.date.slice(8,10) + '-' + lesson.date.slice(5,7) + '-' + lesson.date.slice(0,4)
    const list = studentList.sort((a, b) => {return a.fio.toLowerCase() > b.fio.toLowerCase() ? 1 : -1})
        .map((student, index) => {
                const markStart = marks.find(item => item.student === student._id)
                let markNumber
                if (markStart){markNumber = markStart.mark} else {markNumber = ''}
            return (
                <tr>
                    <td>{index + 1}. {student.fio}</td>
                    <td className="mark">
                        <InputMark mark={markNumber} markStart={markStart} lesson={lesson._id} student={student._id}/>
                    </td>
                </tr>)})

    return (
        <div >
            <button className="back" onClick={() => {
                browserHistory.goBack()
                dispatch(setMarks([]))
                dispatch(setGroup({}))
                dispatch(setGroupList([]))
            }}>Вернуться к расписанию</button>
            <button className="back" onClick={() => {
                addMarks(marksChange)
                dispatch(setChangeMarks([]))
                dispatch(changeLesson({id: lesson._id, tema: tema, homework: homework, teacher: teacher.id}))

                }}>Сохранить изменения</button>
            <div className="lesson_list">
            <h3>Занятие от {dateStr}</h3>
            <div><i>Предмет:</i> {object.name}</div>
            <div className="input">
                <i>Тема:</i>
                <input value={tema} type="text" onChange={(event) => {
                    setTema(event.target.value)
                }}/>
            </div>
            <div className="input">
                <i>Домашнее задание:</i>
                <textarea value={homework} style={{width: "757px"}} onChange={(event) => {
                    setHomework(event.target.value)
                }}/>
            </div>
            <div>Группа {group.name}</div>
            <div>
                <table >
                    <tr><th>ФИО</th><th>Оценка</th></tr>
                    {list}
                </table>
            </div>
            </div>
        </div>

    );
}

export default Lesson;