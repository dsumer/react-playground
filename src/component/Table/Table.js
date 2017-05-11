import React from 'react';
import Header from './Header/Header';

class Table extends React.Component {
    render() {
        return (
            <div className={this.props.className} style={{display: 'table', width: '100%'}}>
                <Header items={this.props.header}/>
                <div className="table-body" style={{display: 'table-row-group'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Table;
