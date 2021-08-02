import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addChangeMarks} from "../../reducers/groupReducer";


const InputMark = (props) => {
    const dispatch = useDispatch()

    const [mark, setMark] = useState(props.mark)
    return (
        <input onChange={(event)=> {
            setMark(event.target.value)
            dispatch(addChangeMarks({lesson: props.lesson, student: props.student, mark: event.target.value}))
        }} value={mark} type="text"/>
    );
};

export default InputMark;