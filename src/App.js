import React from 'react';
import Table from './component/Table/Table';

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
                    age: 33
                }
            ]
        };
    }

    onChangeName(index, e) {
        let newName = e.target.value;
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

    sortByName(ascending) {
        this.setState((prevState) => {
            prevState.data.sort((a, b) => {
                if(a.name < b.name) return ascending ? -1 : 1;
                if(a.name > b.name) return ascending ? 1 : -1;
                return 0;
            });
            return prevState;
        });
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.add.bind(this)}>add</button>
                </div>
                <div>
                    <Table header={[
                        {text: 'Name', sortBy: this.sortByName.bind(this)},
                        {text: 'Age'},
                        {text: 'Actions'}
                    ]}>
                        {
                            this.state.data.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <input type="text" value={row.name}
                                                   onChange={this.onChangeName.bind(this, index)} />
                                        </td>
                                        <td>{row.age}</td>
                                        <td><button onClick={this.remove.bind(this, index)}>remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                </div>
            </div>
        );
    }
}

export default App;
