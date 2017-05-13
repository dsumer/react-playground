import React from "react";
import TableStore from "./store/TableStore";
import moment from "moment";
import {Table, Column} from "../component/Table";
import DatePicker from "react-datepicker";
import {observer} from 'mobx-react';

@observer
class Mobx extends React.Component {
    constructor(props) {
        super(props);

        this.tableStore = new TableStore([
            {
                name: 'Test',
                age: 38,
                date: moment('27/01/1978', 'DD/MM/YYYY')
            },
            {
                name: 'Alex',
                age: 24,
                date: moment()
            },
            {
                name: 'Gistav',
                age: 13,
                date: moment('17/06/2001', 'DD/MM/YYYY')
            }
        ]);
    }

    render() {
        return (
            <div>
                <h1>Example with MobX</h1>
                <div className="example-wrapper">
                    <div>
                        Filter: <input type="value" value={this.tableStore.filter} onChange={this.tableStore.changeFilter} />
                    </div>
                    <br/>
                    <div>
                        <button onClick={this.tableStore.addItem}>add</button>
                    </div>
                    <Table data={this.tableStore.filteredData}
                           header={[
                               {content: 'Name', sortBy: this.tableStore.sortByName},
                               {content: 'Age', sortBy: this.tableStore.sortBy.bind(null, 'age')},
                               {content: 'Date', sortBy: this.tableStore.sortBy.bind(null, 'date')},
                               {content: 'Actions'}
                           ]}
                           columns={(row, index) => {
                               return [
                                   <Column>
                                       <input type="text" value={row.name} onChange={row.onChangeName}/>
                                   </Column>,
                                   <Column>
                                       {row.age}
                                   </Column>,
                                   <Column>
                                       <DatePicker
                                           dateFormat="DD.MM.YYYY"
                                           selected={row.date}
                                           onChange={row.onChangeDate}
                                       />
                                   </Column>,
                                   <Column>
                                       <button onClick={this.tableStore.remove.bind(null, index)}>remove</button>
                                   </Column>
                               ];
                           }}
                           itemsPerPage={2}/>
                </div>
            </div>
        );
    }
}

export default Mobx;