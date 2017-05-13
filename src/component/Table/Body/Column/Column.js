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

/**
 * Column Component - is used by the app to indicate which Columns should be rendered on the table, styled for mobile support.
 */
function Column(props) {
    return <Style className="table-column" mobileWidth={props.mobileWidth}>{props.children}</Style>
}

export default Column;