import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";

const API = 'http://localhost:3001/api/';
const ALL_DEAL_QUERY = 'deals';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: []
        }
    }
    
  componentDidMount() {
    fetch(API + ALL_DEAL_QUERY)
        .then(response => response.json())
        .then(response => {
            this.setState({ deals: response });
        });
  }

  renderDeals = () => {
    console.log(this.state.deals)
    const {deals} = this.state;
    let dealRows;
    if (deals.length !== 0) {
      let sortedByDateDeal = deals.sort(function(a,b){ 
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
      });
      dealRows = sortedByDateDeal.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.title}</td>
                <td>{item.amountRequired}</td>
                <td>{item.createdAt}</td>
            </tr>
        );
      });
    }
    return dealRows;
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p></p>
        <div className="row text-left">
          <div className="col-8">
            <main>
              <h3><p>Deals</p></h3>
              <table className="table table-hover">
                  <thead className="table-info">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Amount Required</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>     
                    {this.renderDeals()}
                  </tbody>
              </table>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
