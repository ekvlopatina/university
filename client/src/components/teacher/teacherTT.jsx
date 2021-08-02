import React, {useState} from 'react';
import '../app.css'

import {useDispatch, useSelector} from "react-redux";
import {createLessons, getLessons} from "../../actions/user";
import LessonTDay from "./lessonTDay";
import {setLesson, setTimetable} from "../../reducers/lessonReducer";
import {setPopupDisplay} from "../../reducers/teacherReducer";


const TeacherTT = () => {
    const dispatch = useDispatch()
    const weekday = ['пн', 'вт', 'ср', 'чт', 'пт']
    const typeSort = ['на день', 'на неделю', 'на дату']
    const dateNow = new Date(Date.now())
    const [day, setDay] = useState("пн")
    const [date, setDate] = useState(
        String(dateNow.getFullYear()) + '-' +
        String(Math.floor(((dateNow.getMonth() + 1)/10))) + String(((dateNow.getMonth() + 1)%10)) + '-' +
        String(Math.floor((dateNow.getDate()/10))) + String(((dateNow.getDate()%10))))
    const [dateNum, setDateNum] = useState('')
    const [type, setType] = useState("на неделю")
    const [paramDay, setParamDay] = useState(false)
    const [paramDate, setParamDate] = useState(false)
    const [paramWeek, setParamWeek] = useState(false)
    const [message, setMessage] = useState(false)
    const options = typeSort.map((type, index) => <option key={index}>{type}</option>)
    const optionsDay = weekday.map((day, index) => <option key={index}>{day}</option>)

    const lessons = useSelector(state => state.lessons.lessons)
    const plan = useSelector(state => state.lessons.timetable)
    const teacher = useSelector(state => state.teacher.currentTeacher)

    return (
        <div className="" >
            <h2 className="parametr">Расписание</h2>
            <select  className="sort" value={type} onChange={(event) => {
                setType(event.target.value)
                setParamDay(false)
                setParamDate(false)
                setParamWeek(false)
                setMessage(true)
                dispatch(setLesson([]))
                // setDate("")
            }}>
                {options}
            </select>
            {type ==='на день' && <div className="parametr">
                <select  className="sort" value={day} onChange={(event) => {
                    setDay(event.target.value)
                    setParamDay(false)
                    setParamDate(false)
                    setParamWeek(false)
                    dispatch(setLesson([]))
                }
                }>
                    {optionsDay}
                </select>
                <button className="display_btn"
                    onClick={() => {
                        dispatch(getLessons(type, day, date))
                        setParamDay(true)}}>
                    Показать
                </button>
                {paramDay && <button className="display_btn"
                        onClick={() => {dispatch(setPopupDisplay('flex'))
                            }}>
                    Добавить занятие
                </button>}


            </div> }{paramDay && <LessonTDay lessonday={lessons} day={day} key={day}/>}

            {type ==='на дату' && <div className="parametr">
                {/*<Input value={date} setValue={setDate} type="date" placeholder="Date" />*/}
                <input className="parametr-date" value={date} type="date" placeholder="Date"
                       onChange={(event)=> {
                           setDate(event.target.value)
                           setMessage(false)
                           dispatch(setLesson([]))
                           dispatch(setTimetable([]))
                }}
                       />
                {type ==='на дату' && message && alert("P.S. данные о занятиях частично заполнены с 5.07")}
                <button className="display_btn" onClick={() =>{

                    const datet = new Date(Date.parse(date))
                    setDateNum(datet)
                    // console.log((datet.getDay() -1)%5)
                    setDay(weekday[(datet.getDay() -1)%5])
                    const dayt = weekday[(datet.getDay() -1)%7]
                    dispatch(getLessons(type, dayt, datet))
                    setParamDate(true)
                    setMessage(false)
                }}>
                    Показать
                </button>

                {paramDate && (lessons.length !== plan.length) && <button className="display_btn"
                                     onClick={() => {
                                         console.log(dateNum, typeof dateNum)
                                         dispatch(createLessons(day, dateNum, teacher))
                                     }}>
                    Заполнить_занятия
                </button>}
            </div>}{paramDate && <LessonTDay lessonday={lessons} day={day} date={date} key={date}/>}
            {type ==='на неделю' && <div className="parametr">
                <button className="display_btn" onClick={() =>{
                    dispatch(getLessons(type, day, date))
                    setParamWeek(true)
                    }}>
                    Показать
                </button>

            </div>}{paramWeek && weekday.map(day => {let mas = [];
            for (let lesson of lessons)
            {if (lesson.day === day){mas.push(lesson)}}return mas}).map(
            (lessonday, index )=> <LessonTDay lessonday={lessonday} day={weekday[index]} key={weekday[index]}/>)}

        </div>

    )
}

export default TeacherTT;
