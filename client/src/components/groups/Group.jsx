import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {setGroup, setGroupList} from "../../reducers/groupReducer"


const Group = () => {
    const dispatch = useDispatch()
    const studentList = useSelector(state => state.group.groupList)
    const group = useSelector(state => state.group.currGroup)
    const browserHistory = useHistory()
    const groupList = studentList.sort((a, b) => {return a.fio.toLowerCase() > b.fio.toLowerCase() ? 1 : -1}).map(student => <li>{student.fio}</li>)

    return (
        <div>
            <button className="back" onClick={() => {
                browserHistory.goBack()
                dispatch(setGroup({}))
                dispatch(setGroupList([]))}}>Вернуться к списку групп</button>
            <div className="list">
                <h2>Группа {group.name}</h2>
                <ol>
                    {groupList}
                </ol>
            </div>
        </div>
    );
};

export default Group;