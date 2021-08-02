import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/teacherReducer";
import {addNewGroup, addNewObject} from "../../actions/user";


const PopupObject = (props) => {
    const dispatch = useDispatch()
    const popupDisplay = useSelector(state => state.teacher.popupDisplay)
    const list = useSelector(state => state.group.list)
    const [element, setElement] = useState('')
    const options = list.map((element, index) => <option key={index} >{element.name}</option>)

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <h3>Добавить {props.type}</h3>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>x</button>
                </div>
                <div className="popup__object">
                    <select value={element} onChange={(event) => {
                        setElement(event.target.value)}}>{options}</select>
                </div>
                <button className="popup__create" onClick={() => {
                    {element === '' && setElement(list[0].name)}
                    {props.type === "группу" && dispatch(addNewGroup(element))}
                    {props.type === "предмет" && dispatch(addNewObject(element))}
                    dispatch(setPopupDisplay('none'))
                }}>Добавить</button>
            </div>
        </div>
    );
};

export default PopupObject;