import React, {Component} from "react";
import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: [],
            stats: ''
        }
    }

    async componentDidMount() {
        await fetch(`http://localhost:3001/api/deals`)
            .then(response => response.json())
            .then(response => {
                this.setState({deals: response});
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
            fetch(`http://localhost:3001/api/deals?title=${search}`)
                .then(response => response.json())
                .then(response => {
                    this.setState({deals: response});
                });
        }
    }

    render() {
        const {deals, stats} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <h5>Total Deals: {stats !== '' ? stats.deals_count : 0}</h5>

                <main className="BodyContent">
                    <h1>Deals</h1>
                    <div>
                        <input placeholder="Search title here" onChange={(e) => {
                            this.setState({search: e.target.value})
                        }}/>
                        <button onClick={() => this.onClickSearch()}>Search</button>
                    </div>
                    <div>
                        <ul>
                            {
                                deals.length > 0 ?
                                    deals.map((deal, index) => (
                                        <li key={index}>
                                            <h6>{deal.title}</h6>
                                        </li>
                                    )) :
                                    <li>Fetching...</li>
                            }
                        </ul>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
