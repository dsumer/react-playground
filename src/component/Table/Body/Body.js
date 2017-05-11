import React from 'react';

class Body extends React.Component {
    renderColumns(row, index) {
        let columns = this.props.columns(row, index);
        let newColumns = [];
        for (let index = 0; index < columns.length; index++) {
            newColumns.push(React.cloneElement(columns[index], {key: index}));
        }
        return newColumns;
    }

    render () {
        if (this.props.data.length <= 0) {
            return null;
        }

        return (
            <div className="table-body" style={{display: 'table-row-group'}}>
                {
                    this.props.data.map((row, index) => {
                        return (
                            <div key={index} className="table-row" style={{display: 'table-row'}}>
                                {this.renderColumns(row, index)}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Body;