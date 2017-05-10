import React from 'react';
import './Table.css';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.sortBy = {
            index: null,
            ascending: true
        };
    }

    getHeaderClass(column, index) {
        let className = 'col-' + index;

        if (column.sortBy) {
            className += ' sortable';

            if (this.sortBy.index === index) {
                className += ' active';

                if (!this.sortBy.ascending) {
                    className += ' desc';
                }
            }
        }

        return className;
    }

    getSortBy(column, index) {
        if (column.sortBy) {
            return () => {
                if (this.sortBy.index === index) {
                    this.sortBy.ascending = !this.sortBy.ascending;
                } else {
                    this.sortBy.index = index;
                    this.sortBy.ascending = true;
                }

                column.sortBy.bind(null, this.sortBy.ascending)();
            };
        }
        return null;
    }

    getHeader() {
        return this.props.header.map((column, index) => {
            return <div key={index} onClick={this.getSortBy(column, index)}
                       className={this.getHeaderClass(column, index)}>{column.text}</div>;
        });
    }

    render() {
        return (
            <div className={'table ' + this.props.className}>
                <div className="table-header">
                    {this.getHeader()}
                </div>
                <div className="table-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Table;
