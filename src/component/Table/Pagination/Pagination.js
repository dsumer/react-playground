import React from 'react';

/**
 * Pagination Component - rendering buttons for switching between the pages.
 */
class Pagination extends React.Component {
    renderButtons() {
        let pages = [];
        for (let index = 0; index < this.props.count; index++) {
            pages.push(<button key={index}
                               onClick={this.props.onChange.bind(null, index)}
                               className={index === this.props.current ? 'active' : ''}>{(index + 1)}</button>);
        }
        return pages;
    }

    render() {
        if (this.props.count <= 1) {
            return null;
        }

        return (
            <div className="pagination">
                {this.renderButtons()}
            </div>
        )
    }
}

export default Pagination;