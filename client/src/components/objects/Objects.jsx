import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PopupObject from "../popup/popupObject";
import {getObjects} from "../../actions/user";
import {setPopupDisplay} from "../../reducers/teacherReducer";


const Objects = () => {
    const dispatch = useDispatch()
    const objects = useSelector(state => state.teacher.objects)
    const [param, setParam] = useState(false)
    const objectsMas = objects.map(object => <li>{object.name}</li>)
    const prop = "предмет"
    return (
            <div >
                <div className="list">
                    <div className="create">
                        <h2>Доступные предметы</h2>
                        <button onClick={() => {
                            dispatch(getObjects())
                            setParam(true)
                            dispatch(setPopupDisplay('flex'))
                        }}>Добавить предмет</button>
                    </div>
                    <ul>{objectsMas}</ul>
                </div>
                {param && <PopupObject type={prop}/>}
            </div>
    );
};

export default Objects;