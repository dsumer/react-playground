import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Table.css";
import Plain from './Plain/Plain'
import Mobx from './Mobx/Mobx'

class Table extends React.Component {

    render() {
        return (
            <div>
                <Plain />
                <Mobx />
            </div>
        );
    }
}

export default Table;
