import React from 'react';


const LessonS = (props) => {

    if (props.date){
        return (
            <div>
            <div className="lesson_link_student">
                <div className="lesson_date">{props.lesson.date.slice(0,10)}</div>
                <div className="lesson_object">{props.object.name}</div>
                <div className="lesson_tema">{props.lesson.tema}</div>
                <div className="lesson_homework">{props.lesson.homework}</div>
                <div className="lesson_student_teacher">{props.teacher.fio}</div>
                <div className="lesson_mark">{props.mark && props.mark.mark}</div>
            </div>
            </div>
        );
    } else {
        return (
            <div className="lesson_student">
                <div className="lesson_date">{props.lesson.day}</div>
                <div className="lesson_object">{props.object.name}</div>
                <div className="lesson_student_teacher">{props.teacher.fio}</div>
            </div>

        );
    }


};

export default LessonS;