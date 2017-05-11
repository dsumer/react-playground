import React from "react";
import Header from "./Header/Header";
import Row from "./Row/Row";

class Table extends React.Component {
    renderColumns(row, index) {
        let columns = this.props.columns(row, index);
        let newColumns = [];
        for (let index = 0; index < columns.length; index++) {
            newColumns.push(React.cloneElement(columns[index], {key: index}));
        }
        return newColumns;
    }

    render() {
        return (
            <div className={this.props.className} style={{display: 'table', width: '100%'}}>
                <Header items={this.props.header}/>
                <div className="table-body" style={{display: 'table-row-group'}}>
                    {this.props.children}
                    {
                        this.props.data.map((row, index) => {
                            return (
                                <Row key={index}>
                                    {this.renderColumns(row, index)}
                                </Row>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Table;
