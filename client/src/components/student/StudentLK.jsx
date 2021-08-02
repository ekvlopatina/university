import React from 'react';
import '../app.css'

import {useSelector} from "react-redux";
import StudentTT from "./studentTT";


const StudentLK = () => {
    const student = useSelector(state => state.student.currentStudent)
    const group = useSelector(state => state.student.currentGroup)
    return (
        <div className="lk" >
            <h2 className="header_lk">Личный кабинет студента {student.fio} {group.name}</h2>
            <StudentTT />
        </div>
    );
};

export default StudentLK;