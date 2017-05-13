import React from 'react';
import Column from './Column/Column';
import styled from 'styled-components';

const Style = styled.div`
    @media (max-width: ${props => props.mobileWidth}px) {
        display: none;
    }
    
    @media (min-width: ${props => (props.mobileWidth + 1)}px) {
        display: table-header-group;
    }
`;
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.sortBy = {
            index: null,
            ascending: true
        };
    }

    getSortBy(column, index) {
        if (column.sortBy) {
            return () => {
                if (this.sortBy.index === index) {
                    this.sortBy.ascending = !this.sortBy.ascending;
                } else {
                    this.sortBy.index = index;
                    this.sortBy.ascending = true;
                }

                column.sortBy.bind(null, this.sortBy.ascending)();
            };
        }
        return null;
    }

    render() {
        return (
            <Style className="table-header" mobileWidth={this.props.mobileWidth}>
                {
                    this.props.items.map((column, index) => {
                        return <Column key={index}
                                       onClick={this.getSortBy(column, index)}
                                       className={"col-" + index}
                                       sortable={column.sortBy}
                                       active={this.sortBy.index === index}
                                       ascending={this.sortBy.ascending}
                                       aria-hidden="true">{column.content}</Column>;
                    })
                }
            </Style>
        );
    }
}

export default Header;
