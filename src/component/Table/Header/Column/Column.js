import React from 'react';
import styled from 'styled-components';

const Column = styled.div`
    display: table-cell;
    position: relative;
    font-weight: bold;
    cursor: ${props => props.sortable ? 'pointer' : 'inherit'};
    
    ${props => (props.sortable && props.active && props.ascending) ? `
    &::after {
        content: " ";
        width: 0px;
        height: 0px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #2f2f2f;
        position: absolute;
        right: 2px;
        top: calc(50% - 2px);
    }
    ` : ''}
    ${props => (props.sortable && props.active && !props.ascending) ? `
    &::after {
        content: " ";
        width: 0px;
        height: 0px;
        border: 5px solid transparent;
        border-top-color: #2f2f2f;
        position: absolute;
        right: 2px;
        top: calc(50% - 2px);
    }
    ` : ''}
`;

export default Column;