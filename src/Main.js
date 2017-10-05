import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './route/Home/Home';
import Table from './route/Table/Table';
import Forms from './route/Forms/Forms';
import DatePicker from './route/DatePicker/DatePicker';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/table' component={Table}/>
            <Route path='/forms' component={Forms}/>
            <Route path='/datepicker' component={DatePicker}/>
        </Switch>
    </main>
);

export default Main;