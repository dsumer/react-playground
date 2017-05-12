import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Plain from './Plain/Plain'
import Mobx from './Mobx/Mobx'

class App extends React.Component {

    render() {
        return (
            <div>
                <Plain />
                <Mobx />
            </div>
        );
    }
}

export default App;
