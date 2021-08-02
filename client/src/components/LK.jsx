import React from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import TeacherLk from "./teacher/teacherLK";
import StudentLK from "./student/StudentLK";


const Lk = () => {
    const user = useSelector(state => state.user.currentUser)
    return (
        <BrowserRouter>
            <div className="lk" >
                    {user.role === "student" ?
                        <Switch>
                            <Route path="/user/student" component={StudentLK}/>
                            <Redirect to="/user/student"/>
                        </Switch>
                        :
                        <Switch>
                            <Route path="/user/teacher" component={TeacherLk}/>
                            <Redirect to="/user/teacher"/>
                        </Switch>
                    }

                </div>
        </BrowserRouter>



    );
};

export default Lk;