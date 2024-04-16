import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Schedule extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    games:[]
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    if(idToken && idToken.idToken && idToken.idToken.claims)
    {
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });
  }
    this.getDailyPlayerPoints();
  
}

  getDailyPlayerPoints = ()=> {
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/schedule", requestOptions)
      .then(response => response.text())
      .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({games: result})})
      .catch(error => console.log('error', error));
  }

  render() {
    const { games } = this.state;
    return (
    <div>
        <Button variant="warning" size="lg" block>
                    IPL 2021 Schedule
                </Button>
         <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Game #</th>
                    <th>Game Date</th>
                    <th>Team 1</th>
                    <th>Team 2</th>
                    <th>Winning Team</th>
                    <th>Points</th>
                   
                    
                    </tr>
                </thead>
                <tbody>
                {games && games.map((element,index) => { 
                    return <tr key = {index}>
                        <td>{element.gameNum}</td>
                        <td>{element.gameDate}</td>
                        <th>{element.team1}</th>
                        <th>{element.team2}</th>
                        <td>{element.winningTeam}</td>
                        <td>{element.maxPoints}</td>
                 
                        
                    </tr>       
                })}
                </tbody>
                </Table>
       
      </div>
    );
  }
}

export default Schedule;
