import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
    @media (max-width: ${props => props.mobileWidth}px) {
        display: table-row-group;
    }
    
    @media (min-width: ${props => (props.mobileWidth + 1)}px) {
        display: table-cell;
    }
`;
function Column(props) {
    return <Style className="table-column" mobileWidth={props.mobileWidth}>{props.children}</Style>
}

export default Column;