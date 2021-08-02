import React from 'react';
// import './app.css'
import TeacherTT from "./teacherTT";

// import {useSelector} from "react-redux";
import Objects from "../objects/Objects";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Groups from "../groups/Groups";
import Nav from "./Nav";
import {useSelector} from "react-redux";

const TeacherLk = () => {
    const teacher = useSelector(state => state.teacher.currentTeacher)

    return (
        <BrowserRouter>
            <div>
                    <h2 className="header_lk">Личный кабинет преподавателя {teacher.fio}</h2>
                    <Nav />
                <Switch>
                    <Route path="/user/teacher/objects" component={Objects}/>
                    <Route path="/user/teacher/groups" component={Groups}/>
                    <Route path="/user/teacher" component={TeacherTT}/>
                </Switch>

            </div>
        </BrowserRouter>
    );
};

export default TeacherLk;