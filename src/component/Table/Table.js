import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.sortBy = {
            index: null,
            ascending: true
        };
    }

    getHeader() {
        return this.props.header.map((column, index) => {
            let props = {
                key: index
            };
            if (column.sortBy) {
                if (this.sortBy.index == index) {
                    this.sortBy.ascending = !this.sortBy.ascending;
                } else {
                    this.sortBy.index = index;
                    this.sortBy.ascending = true;
                }

                props.onClick = column.sortBy.bind(null, this.sortBy.ascending);
            }
            return <th {...props}>{column.text}</th>;
        });
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>{this.getHeader()}</tr>
                </thead>
                <tbody>{this.props.children}</tbody>
            </table>
        );
    }
}

export default Table;
