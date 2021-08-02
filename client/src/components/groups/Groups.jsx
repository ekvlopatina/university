import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Group from "./Group";
import {getGroup, getGroups} from "../../actions/user";
import PopupObject from "../popup/popupObject";
import {setPopupDisplay} from "../../reducers/teacherReducer";



const GroupList = () => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.teacher.groups)
    const prop = "группу"
    const [param, setParam] = useState(false)
    const groupsMas = groups.map(gr => <li><Link to={`/user/teacher/groups/${gr._id}`} onClick={() => {dispatch(getGroup(gr._id))}}>{gr.name}</Link></li>)
    return (<div>
                <div className="list" >
                    <div className="create">
                        <h2>Группы</h2>
                        <button onClick={() => {
                            dispatch(getGroups())
                            setParam(true)
                            dispatch(setPopupDisplay('flex'))}}>Добавить группу</button>
                    </div>
                        <ul className="groups">{groupsMas}</ul>
                </div>
                {param && <PopupObject type={prop}/>}
            </div>
    );
};



const Groups = () => {
    const groups = useSelector(state => state.teacher.groups)
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/user/teacher/groups"><GroupList/></Route>
                {groups.map(gr => <Route path="/user/teacher/groups/:id"><Group group={gr._id}/></Route>)}
            </Switch>
        </BrowserRouter>

    );
};

export default Groups;