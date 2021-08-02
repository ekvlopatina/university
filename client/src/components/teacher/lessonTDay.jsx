import React from 'react';
import '../app.css'
import {useSelector} from "react-redux";
import LessonT from "./lessonT";
import LessonTObj from "./lessonTObj";
import {Route, Switch} from "react-router-dom";
import Lesson from "./lesson";
import PopupPlanLesson from "../popup/popupPlanLesson";


const LessonList = (props) => {
    const groups = useSelector(state => state.teacher.groups)
    const objects = useSelector(state => state.teacher.objects)
    const plan = useSelector(state => state.lessons.timetable)
    // console.log(props.day)


    if (props.date){
        const dateStr = props.date.slice(8,10) + '-' + props.date.slice(5,7) + '-' + props.date.slice(0,4)
        const lessons = props.lessonday.map(
            less => {
                const planLesson = plan.find(item => item._id === less.planLesson)
                const group = groups.find(item => item._id === planLesson.group)
                const object = objects.find(item => item._id === planLesson.object)
                return (<div>
                        <LessonTObj lesson={less} group={group} object={object}/>

                    </div>
                )
            })
        return (
            <div className="">
                <div className="lesson_header_link">
                    <div className="lesson_date">Дата</div>
                    <div className="lesson_object">Предмет</div>
                    <div className="lesson_tema">Тема</div>
                    <div className="lesson_homework">Домашнее задание</div>
                    <div className="lesson_group">Группа</div>
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
                const group = groups.find(item => item._id === less.group)
                const object = objects.find(item => item._id === less.object)
                return (<LessonT lesson={less} group={group} object={object} key={less._id}/>)
            })
        return (
            <div className="">
                <div className="lesson_header_teacher">
                    <div className="lesson_date">Дата</div>
                    <div className="lesson_object">Предмет</div>
                    <div className="lesson_group">Группа</div>
                </div>
                <div className="lessonday">
                    <div className="lessonday_header">
                    <h3>{props.day.toUpperCase()}</h3> </div>
                    {lessons}
                </div>
            </div>

        )
    }
}

const LessonTDay = (props) => {
    const groups = useSelector(state => state.teacher.groups)
    const objects = useSelector(state => state.teacher.objects)
    const plan = useSelector(state => state.lessons.timetable)
    return (
        <div>
        <Switch>
        <Route  exact path="/user/teacher">
            <LessonList lessonday={props.lessonday} day={props.day} date={props.date} key={props.date}/>
            <PopupPlanLesson day={props.day}/>
        </Route>
        {plan.length !== 0 && (props.lessonday.map(
            less => {
                const planLesson = plan.find(item => item._id === less.planLesson)
                const group = groups.find(item => item._id === planLesson.group)
                const object = objects.find(item => item._id === planLesson.object)
                return (<Route path="/user/teacher/lessons/:id"><Lesson lessonday={props.lessonday} lesson={less} group={group} object={object}/></Route>)
                }))}
        </Switch>
        </div>)
};

export default LessonTDay;