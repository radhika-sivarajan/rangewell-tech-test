import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";

const API = 'http://localhost:3001/api/';
const DEALS_QUERY = 'deals/';
const STATS_QUERY = 'stats/';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          deals: [],
          stats: [],
          date:"",
      }
    }
    
  componentDidMount() {
    fetch(API + DEALS_QUERY)
      .then(response => response.json())
      .then(response => {
        this.setState({ deals: response });
      });

    fetch(API + DEALS_QUERY + STATS_QUERY)
      .then(response => response.json())
      .then(response => {
        this.setState({ stats: response });
    });
  }


  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  }

  // Method to render all deals sorted by date or specific deal by date
  renderDeals = () => {
    let dealRows;
    if(this.state.date.length === 0) {
      if (this.state.deals.length !== 0) {
        let sortedByDateDeal = this.state.deals.sort((a,b) => { 
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() 
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
    }else{
      if (this.state.deals.length !== 0) {
        dealRows = this.state.deals.map((item, index) => {
          let isDate = item.createdAt.search(this.state.date);
          if(isDate !== -1){
            return (
              <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.amountRequired}</td>
                  <td>{item.createdAt}</td>
              </tr>
            );
          } 
        });
      }
    }
    return dealRows;
  }

  // Method to render stat component
  renderStats = () => {
    if (this.state.stats.length !== 0) {
      return(
        <div>
          <p><b>Deals count</b> : {this.state.stats.deals_count},<b> Total amounts</b> : £{this.state.stats.total_amounts},<b> Avg amount</b> : £{this.state.stats.avg_amount}</p>
        </div>
      );
    }
  }

  renderForm = () => {
    let dates = [];
    const uniqueDateList = this.state.deals.map((date, i) => {
      let slicedDate = new Date(date.createdAt).toISOString().slice(0,10);
      if(dates.indexOf(slicedDate) === -1) {
        dates.push(slicedDate);
        return (
          <option value={slicedDate} key={i}>{slicedDate}</option>
        );
      }
      return 1;
    })
    if (this.state.deals.length !== 0) {
      return(
        <div className="form-group">
          <select className="form-control" name="date" onChange={this.handleDateChange}>
            <option value=''>All deals</option>
            {uniqueDateList}
          </select>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p></p>
        <div className="row text-center stat-info">
          <div className="col-12">
          <h5><p className="text-danger">Stats</p></h5>
          {this.renderStats()}
          </div>
        </div>

        <div className="row text-center">
          <div className="col-6">
            <h3 className="text-info"><p>Deals</p></h3>
          </div>
          <div className="col-5 offset-1">
              {this.renderForm()}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <main>
              <table className="table table-hover text-left">
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
