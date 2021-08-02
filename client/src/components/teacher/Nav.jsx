import React from 'react';
import '../app.css'
import {Link} from "react-router-dom";
const Nav = () => {
    return (
        <div className="navigation_teacher">
            <div><Link to="/user/teacher/objects">Предметы</Link></div>
            <div><Link to="/user/teacher/groups">Студенты</Link></div>
            <div><Link to="/user/teacher">Расписание</Link></div>
        </div>
    );
};
export default Nav;