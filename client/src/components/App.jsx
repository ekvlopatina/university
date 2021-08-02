import React from 'react';
import {useEffect} from "react";
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import Lk from "./LK";
import {createBrowserHistory} from "history";


function App() {
    const isAuth = useSelector(state => state.user.isAuth)

    const dispatch = useDispatch()
    const browserHistory = createBrowserHistory()

    useEffect(() => {
        dispatch(auth())
    }, [])


    return (
        <BrowserRouter history={browserHistory}>
            <div className='app'>
                <Navbar/>
                <div className="wrap">
                    {isAuth ?
                        <Switch>
                            <Route path="/user" component={Lk}/>
                            <Redirect to="/user"/>
                        </Switch>
                        :
                        <Switch>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to="/login"/>
                        </Switch>
                    }



                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;