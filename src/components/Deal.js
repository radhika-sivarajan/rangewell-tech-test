import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";


class Deal extends Component {

    state = {
        deal: '',
        loading: true
    }

    componentWillMount() {
        const {params} = this.props.match;
        this.getDealById(params);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {params} = nextProps.match;
        this.getDealById(params);
    }

    getDealById({id}) {
        if (id) {
            fetch(`http://localhost:3001/api/deal/${id}`)
                .then(response => response.json())
                .then(response => {
                    this.setState({deal: response[0], loading: false});
                })
        }
    }

    render() {
        const {deal, loading} = this.state;
        if (loading)
            return <h3>fetching...</h3>
        if (deal === '')
            return <h3>something wrong</h3>
        return (
            <div style={{width: '50%'}}>
                <NavLink to={'/'}>Clear</NavLink>
                <h4>{deal.title}</h4>
                <h5>Amount Required : {deal.amountRequired}</h5>
                <h6>Created on : {deal.createdAt}</h6>
            </div>
        )
    }
}

export default withRouter(Deal);
