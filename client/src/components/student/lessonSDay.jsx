import React from 'react';
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import LessonS from "./lessonS";

const LessonList = (props) => {
    const teachers = useSelector(state => state.student.teachers)
    const objects = useSelector(state => state.student.object)
    const plan = useSelector(state => state.lessons.timetable)
    const marks = useSelector(state => state.lessons.marks)

    if (props.date){
        const dateStr = props.date.slice(8,10) + '-' + props.date.slice(5,7) + '-' + props.date.slice(0,4)
        let mark = null
        const lessons = props.lessonday.map(
            less => {
                const planLesson = plan.find(item => item._id === less.planLesson)
                const teacher = teachers.find(item => item._id === planLesson.teacher)
                const object = objects.find(item => item._id === planLesson.object)
                if (marks.length > 0 && marks[0] !== null){mark = marks.find(item => item.lesson === less._id)}
                return (<LessonS lesson={less} object={object} teacher={teacher} mark={mark} date={props.date}/>)
            })
        return (
            <div className="">
                <div className="lesson_header_link">
                    <div className="lesson_date">Дата</div>
                    <div className="lesson_object">Предмет</div>
                    <div className="lesson_tema">Тема</div>
                    <div className="lesson_homework">Домашнее задание</div>
                    <div className="lesson_student_teacher">Преподаватель</div>
                    <div className="lesson_mark">Оценка</div>
                </div>
                <div className="lessonday">
                    <div className="lessonday_header">
                    <h3>{props.day.toUpperCase()}</h3>
                    <h3>{dateStr}</h3>
                    </div>
                    {lessons}
                </div>
            </div>

        )
    }
    else {
        const lessons = props.lessonday.map(
            less => {
                const teacher = teachers.find(item => item._id === less.teacher)
                const object = objects.find(item => item._id === less.object)
                return (<LessonS lesson={less} teacher={teacher} object={object} key={less._id}/>)})
        return (
            <div className="">
                <div className="lesson_header_student">
                    <div className="lesson_date">Дата</div>
                    <div className="lesson_object">Предмет</div>
                    <div className="lesson_student_teacher">Преподаватель</div>
                </div>
                <div className="lessonday">
                    <div className="lessonday_header">
                        <h3>{props.day.toUpperCase()}</h3></div>
                    {lessons}
                </div>
            </div>

        )
    }
}


const LessonSDay = (props) => {

    return (
        <Switch>
            <Route  exact path="/user/student">
                <LessonList lessonday={props.lessonday} day={props.day} date={props.date} key={props.date}/>
            </Route>
        </Switch>)

};

export default LessonSDay;