import styled from "styled-components";

const TableRow = styled.div`
    @media (max-width: ${props => props.mobileWidth}px) {
        display: table;
        width: 100%;
    }
    
    @media (min-width: ${props => (props.mobileWidth + 1)}px) {
        display: table-row;
    }
`;

export default TableRow;