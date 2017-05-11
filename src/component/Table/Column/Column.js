import React from 'react';

function Column(props) {
    return <div className="table-column" style={{display: 'table-cell'}}>{props.children}</div>
}

export default Column;