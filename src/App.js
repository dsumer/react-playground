import React from 'react';
import Table from './component/Table/Table';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Test',
                    age: 38
                },
                {
                    name: 'Alex',
                    age: 24
                },
                {
                    name: 'Gistav',
                    age: 13
                }
            ]
        };
    }

    onChangeName(index, e) {
        const newName = e.target.value;
        this.setState((prevState) => {
            prevState.data[index].name = newName;
            prevState.data[index].age++;
            return prevState;
        });
    }

    add() {
        this.setState((prevState) => {
            prevState.data.push({
                name: 'ASD',
                age: 11
            });
            return prevState;
        });
    }

    remove(index) {
        this.setState((prevState) => {
            prevState.data.splice(index, 1);
            return prevState;
        });
    }

    sortByAlphabetical(prop, ascending) {
        this.setState((prevState) => {
            prevState.data.sort((a, b) => {
                if (a[prop] < b[prop]) {
                    return ascending ? -1 : 1;
                }
                if (a[prop] > b[prop]) {
                    return ascending ? 1 : -1;
                }
                return 0;
            });
            return prevState;
        });
    }

    sortByNumber(prop, ascending) {
        this.setState((prevState) => {
            prevState.data.sort((a, b) => {
                if (ascending) {
                    return a[prop] - b[prop];
                } else {
                    return b[prop] - a[prop];
                }
            });
            return prevState;
        });
    }

    getTable(className) {
        return (
            <Table className={className} header={[
                {text: 'Name', sortBy: this.sortByAlphabetical.bind(this, 'name')},
                {text: 'Age', sortBy: this.sortByNumber.bind(this, 'age')},
                {text: 'Actions'}
            ]}>
                {
                    this.state.data.map((row, index) => {
                        return (
                            <div key={index} className="table-row">
                                <div className="table-column">
                                    <input type="text" value={row.name}
                                           onChange={this.onChangeName.bind(this, index)}/>
                                </div>
                                <div className="table-column">{row.age}</div>
                                <div className="table-column">
                                    <button onClick={this.remove.bind(this, index)}>remove</button>
                                </div>
                            </div>
                        )
                    })
                }
            </Table>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.add.bind(this)}>add</button>
                </div>
                <div>
                    {this.getTable('')}
                    <br/><br/><br/>
                    {this.getTable('my-table')}
                </div>
            </div>
        );
    }
}

export default App;
