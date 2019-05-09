import React, {Component} from "react";

import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from 'react-router-dom';


import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";
import Deals from "./components/Deals";
import Deal from "./components/Deal";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: [],
            stats: '',
            loading: true
        }
    }

    async componentWillMount() {
        await fetch(`http://localhost:3001/api/deals`)
            .then(response => response.json())
            .then(response => {
                this.setState({deals: response, loading: false});
            });
        await fetch(`http://localhost:3001/api/deals/stats`)
            .then(response => response.json())
            .then(response => {
                this.setState({stats: response[0]});
            });
    }

    onClickSearch() {
        const {search} = this.state;
        if (search !== '') {
            this.setState({loading: true})
            fetch(`http://localhost:3001/api/deals?title=${search}`)
                .then(response => response.json())
                .then(response => {
                    this.setState({deals: response, loading: false});
                });
        }
    }

    onBlurDate(e) {
        const {value} = e.target;
        if (value) {
            this.setState({loading: true})
            fetch(`http://localhost:3001/api/deals?dateFrom=${value}`)
                .then(response => response.json())
                .then(response => {
                    this.setState({deals: response, loading: false});
                });
        }
    }


    render() {
        const {deals, stats, loading} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h4>Total Amount Required :{stats !== '' ? stats.total_amounts : 0} </h4>
                    <h4> Average amount : {stats !== '' ? stats.avg_amount : 0}</h4>
                    <h4> Total : {stats !== '' ? stats.deals_count : 0}</h4>
                </div>
                <main className="BodyContent">
                    <h1>Deals</h1>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '60%'}}>

                        <div>
                            <input placeholder="Search title here" onChange={(e) => {
                                this.setState({search: e.target.value})
                            }}/>
                            <button onClick={() => this.onClickSearch()}>Search</button>
                        </div>
                        <div>
                            <input type="date" placeholder="yyyy-mm-dd" onBlur={(e) => this.onBlurDate(e)}/>
                        </div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Router>
                            <Route path='/' render={() => (
                                <div style={{width: '50%'}}>
                                    {loading ?
                                        <h3>fetching...</h3>
                                        :
                                        <Deals deals={deals}/>
                                    }
                                </div>
                            )}/>
                            <Route exact path={'/:id'} render={() => <Deal/>}/>
                        </Router>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
