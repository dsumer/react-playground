import React from "react";
import styled from "styled-components";
import ColumnWrapper from "./ColumnWrapper/ColumnWrapper";
import TableRow from "./TableRow/TableRow";

const Style = styled.div`
    @media (max-width: ${props => props.mobileWidth}px) {
        display: block;
    }
    
    @media (min-width: ${props => (props.mobileWidth + 1)}px) {
        display: table-row-group;
    }
`;

/**
 * Body Component - containing all rows and their columns.
 */
class Body extends React.Component {
    renderColumns(row, index) {
        let columns = this.props.columns(row, index);
        let newColumns = [];
        for (let index = 0; index < columns.length; index++) {
            newColumns.push(React.cloneElement(columns[index], {key: index, mobileWidth: this.props.mobileWidth},
                <ColumnWrapper mobileWidth={this.props.mobileWidth} content={this.props.header[index].content}>
                    {columns[index].props.children}
                </ColumnWrapper>));
        }
        return newColumns;
    }

    render() {
        if (this.props.data.length <= 0) {
            return null;
        }

        return (
            <Style className="table-body" mobileWidth={this.props.mobileWidth}>
                {
                    this.props.data.map((row, index) => {
                        const realIndex = (this.props.currentPage * this.props.itemsPerPage) + index;

                        return (
                            <TableRow key={index} className="table-row" mobileWidth={this.props.mobileWidth}>
                                {this.renderColumns(row, realIndex)}
                            </TableRow>
                        )
                    })
                }
            </Style>
        );
    }
}

export default Body;