import React, {useState} from 'react';
import '../app.css'
import {useDispatch, useSelector} from "react-redux";
import { getStudentLessons} from "../../actions/user";
import LessonSDay from "./lessonSDay";
import {setLesson, setMarks, setTimetable} from "../../reducers/lessonReducer";


const StudentTT = () => {
    const dispatch = useDispatch()
    const weekday = ['пн', 'вт', 'ср', 'чт', 'пт']
    const typeSort = ['на день', 'на неделю', 'на дату']
    const [day, setDay] = useState("пн")
    const [date, setDate] = useState("")
    const [type, setType] = useState("на неделю")
    const [paramDay, setParamDay] = useState(false)
    const [paramDate, setParamDate] = useState(false)
    const [paramWeek, setParamWeek] = useState(false)
    const options = typeSort.map((type, index) => <option key={index}>{type}</option>)
    const optionsDay = weekday.map((day, index) => <option key={index}>{day}</option>)
    const lessons = useSelector(state => state.lessons.lessons)

    return (
        <div className="" >
            <h2 className="parametr">Расписание</h2>
            <select className="sort" value={type} onChange={(event) => {
                setType(event.target.value)
                setParamDay(false)
                setParamDate(false)
                setParamWeek(false)
                dispatch(setLesson([]))
            }}>
                {options}
            </select>
            {type ==='на день' && <div className="parametr">
                <select className="sort" value={day} onChange={(event) => {
                    setDay(event.target.value)
                    setParamDay(false)
                    setParamDate(false)
                    setParamWeek(false)
                    dispatch(setLesson([]))}}>
                    {optionsDay}
                </select>
                <button className="display_btn"
                    onClick={() => {
                        dispatch(getStudentLessons(type, day, date))
                        setParamDay(true)}}>
                    Показать
                </button></div>}{paramDay && <LessonSDay lessonday={lessons} day={day}/>}
            {type ==='на дату' && <div className="parametr">
                <input className="parametr-date" value={date} type="date" placeholder="Date"
                       onChange={(event)=> {
                           setDate(event.target.value)
                           dispatch(setLesson([]))
                           dispatch(setTimetable([]))
                           dispatch(setMarks([]))}}/>
                <button className="display_btn" onClick={() =>{
                    let datet = new Date(Date.parse(date))
                    setDay(weekday[datet.getDay() -1])
                    dispatch(getStudentLessons(type, day, datet))
                    setParamDate(true)
                }}>
                    Показать
                </button>
            </div>}{paramDate && <LessonSDay lessonday={lessons} day={day} date={date}/>}
            {type ==='на неделю' && <div className="parametr">
                <button className="display_btn" onClick={() =>{
                    dispatch(getStudentLessons(type, day, date))
                    setParamWeek(true)}}>
                    Показать
                </button>
            </div>}{paramWeek && weekday.map(day => {let mas = [];
            for (let lesson of lessons)
            {if (lesson.day === day){mas.push(lesson)}}return mas}).map((lessonday, index )=> <LessonSDay lessonday={lessonday} day={weekday[index]}/>)}
        </div>
    )
}

export default StudentTT;
