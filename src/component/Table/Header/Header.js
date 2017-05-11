import React from 'react';
import Column from './Column/Column';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.sortBy = {
            index: null,
            ascending: true
        };
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

    render() {
        return (
            <div className="table-header" style={{display: 'table-header-group'}}>
                {
                    this.props.items.map((column, index) => {
                        return <Column key={index}
                                       onClick={this.getSortBy(column, index)}
                                       className={"col-" + index}
                                       sortable={column.sortBy}
                                       active={this.sortBy.index === index}
                                       ascending={this.sortBy.ascending}>{column.text}</Column>;
                    })
                }
            </div>
        );
    }
}

export default Header;
