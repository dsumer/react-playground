import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './route/Home/Home';
import Table from './route/Table/Table';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/table' component={Table}/>
        </Switch>
    </main>
);

export default Main;