import React from 'react';
import '../app.css'
import {deleteLesson} from "../../actions/user";
import {useDispatch} from "react-redux";

const LessonT = (props) => {
    const dispatch = useDispatch()

    return (
        <div className="lesson_teacher">
            <div className="lesson_date">{props.lesson.day}</div>
            <div className="lesson_object">{props.object.name}</div>
            <div className="lesson_group">{props.group.name}</div>
            <div><button onClick={() => {dispatch(deleteLesson('lesson', props.lesson._id))}}>DEL</button></div>
        </div>

    );
};

export default LessonT;