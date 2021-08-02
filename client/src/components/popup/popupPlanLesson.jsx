import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/teacherReducer";
import {createPlanLesson} from "../../actions/user";


const PopupPlanLesson = (props) => {
    const dispatch = useDispatch()
    const popupDisplay = useSelector(state => state.teacher.popupDisplay)
    const groups = useSelector(state => state.teacher.groups)
    const objects = useSelector(state => state.teacher.objects)
    const teacher = useSelector(state => state.teacher.currentTeacher)
    const [object, setObject] = useState(objects[0].name)
    const [group, setGroup] = useState(groups[0].name)
    const optionsGroup = groups.map((group, index) => <option key={index} >{group.name}</option>)
    const optionsObject = objects.map((object, index) => <option key={index}>{object.name}</option>)

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <h3>Добавить занятие</h3>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>x</button>
                </div>
                <div className="popup__object">
                    <i>Предмет</i>
                    <select value={object} onChange={(event) => {
                        setObject(event.target.value)}}>{optionsObject}</select>
                </div>
                <div className="popup__object">
                    <i>Группа</i>
                    <select value={group} onChange={(event) => {setGroup(event.target.value)}}>{optionsGroup}</select>
                </div>
                <button className="popup__create" onClick={() => {
                    dispatch(createPlanLesson(props.day, group, teacher.fio, object))
                    dispatch(setPopupDisplay('none'))
                }}>Добавить</button>
            </div>
        </div>
    );
};

export default PopupPlanLesson;