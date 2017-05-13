import React from "react";
import styled from "styled-components";

const ColumnDescription = styled.div`
    @media (max-width: ${props => props.mobileWidth}px) {
        display: table-cell;
        font-weight: bold;
    }
    
    @media (min-width: ${props => (props.mobileWidth + 1)}px) {
        position:absolute;
        left:-10000px;
        top:auto;
        width:1px;
        height:1px;
        overflow:hidden;
    }
`;
const ColumnContent = styled.div`
    display: table-cell;
`;

const Style = styled.div`
    @media (max-width: ${props => props.mobileWidth}px) {
        display: table-row;
    }
    
    @media (min-width: ${props => (props.mobileWidth + 1)}px) {
        display: block;
    }
`;
class ColumnWrapper extends React.Component {
    render() {
        return (
            <Style mobileWidth={this.props.mobileWidth}>
                <ColumnDescription className="column-description" mobileWidth={this.props.mobileWidth}>
                    {this.props.content}
                </ColumnDescription>
                <ColumnContent className="column-content">{this.props.children}</ColumnContent>
            </Style>
        );
    }
}

export default ColumnWrapper;