import React from 'react';

function Row(props) {
    return <div className="table-row" style={{display: 'table-row'}}>{props.children}</div>
}

export default Row;