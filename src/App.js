import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Header from './Header'
import Main from './Main'

class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
