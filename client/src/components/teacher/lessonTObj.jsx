import React from 'react';

import {Link} from "react-router-dom";
import {deleteLesson, getGroup, getMarks} from "../../actions/user";
import {useDispatch} from "react-redux";
import {delLesson} from "../../reducers/lessonReducer";


const LessonTObj = (props) => {
    const dispatch = useDispatch()
    return (
        <div className="lesson_link">
            <Link to={`/user/teacher/lessons/${props.lesson._id}`} onClick={() => {
            dispatch(getGroup(props.group._id))
            dispatch((getMarks(props.lesson._id)))
        }}>
        <div className="lesson_link_div">
            <div className="lesson_date">{props.lesson.date.slice(0,10)}</div>
            <div className="lesson_object">{props.object.name}</div>
            <div className="lesson_tema">{props.lesson.tema}</div>
            <div className="lesson_homework">{props.lesson.homework}</div>
            <div className="lesson_group">{props.group.name}</div>

        </div></Link>
            <div className="">
                <button onClick={() => {dispatch(deleteLesson('lesson', props.lesson._id))}}>DEL</button>
            </div>

        </div>
    );
};

export default LessonTObj;