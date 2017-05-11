import React from "react";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Pagination from "./Pagination/Pagination";

class Table extends React.Component {
    static defaultProps = {
        emptyText: 'No Items found.',
        itemsPerPage: 0
    };
    static propTypes = {
        data: PropTypes.array.isRequired,
        header: PropTypes.array.isRequired,
        emptyText: PropTypes.string,
        itemsPerPage: PropTypes.number,
        onPageChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0
        };
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    componentWillReceiveProps(props) {
        const pageCount = this.getPageCount(props);
        if (this.state.currentPage >= pageCount) {
            this.setCurrentPage(pageCount - 1);
        }
    }

    setCurrentPage(page) {
        if (page < 0) {
            page = 0;
        }

        this.setState((prevState) => {
            prevState.currentPage = page;
            return prevState;
        });
        if (this.props.onPageChange) {
            this.props.onPageChange(page);
        }
    }

    getPagedData() {
        if (this.props.itemsPerPage <= 0) {
            return this.props.data;
        } else {
            const startIndex = this.state.currentPage * this.props.itemsPerPage;
            return this.props.data.slice(startIndex, (startIndex + this.props.itemsPerPage));
        }
    }

    getPageCount(props) {
        if (props.itemsPerPage < 1) {
            return 0;
        }

        return Math.ceil(this.props.data.length / props.itemsPerPage);
    }

    render() {
        let emptyContent = null;
        if (this.props.data.length <= 0) {
            emptyContent = <div className="empty">{this.props.emptyText}</div>;
        }

        return (
            <div className={this.props.className}>
                <div style={{display: 'table', width: '100%'}}>
                    <Header items={this.props.header}/>
                    <Body data={this.getPagedData()} columns={this.props.columns}/>
                    <Pagination current={this.state.currentPage}
                                count={this.getPageCount(this.props)}
                                onChange={this.setCurrentPage}/>
                </div>
                {emptyContent}
            </div>
        );
    }
}

export default Table;
