import React, {Component} from 'react';
import {NavLink} from "react-router-dom";


class Deals extends Component {

    render() {
        const {deals} = this.props;
        if (deals.length === 0)
            return <h3>No data found</h3>
        return (
            <ul>
                {
                    deals.map((deal, index) => (
                        <NavLink style={{fontSize: 'x-large'}} to={`/${deal._id}`} key={index}>
                            <h6>{deal.title}</h6>
                        </NavLink>
                    ))
                }
            </ul>
        )
    }
}

export default Deals;