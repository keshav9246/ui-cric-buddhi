import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class DailyPlayerScores extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    dailyPlayerScores:[]
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/playerPoints", requestOptions)
      .then(response => response.text())
      .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({dailyPlayerScores: result})})
      .catch(error => console.log('error', error));
  }

  render() {
    const { dailyPlayerScores } = this.state;
    console.log(dailyPlayerScores)
    return (
    <div>
        <Button variant="warning" size="lg" block>
                    Daily Player points
                </Button>
         <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Game #</th>
                    <th>Player name</th>
                    <th>TOTAL GAME POINTS</th>
                    <th>Assigned to</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>SR.</th>
                    <th>Notout ?</th>
                    <th>Run points</th>
                    <th>Fours points</th>
                    <th>Sixes points</th>
                    <th>Runs bonus</th>
                    <th>SR Bonus</th>
                    <th>Total Batting points</th>
                    <th>Runs Given</th>
                    <th>Balls bowled</th>
                    <th>Wickets</th>
                    <th>Eco.</th>
                    <th>Wkt points</th>
                    <th>Eco. points</th>
                    <th>Hatrick bonus</th>
                    <th>Maiden bonus</th>
                    <th>LBW/Bwld bonus</th>
                    <th>Total Bowling points</th>
                    <th>Catches points</th>
                    <th>Stumping points</th>
                    <th>Direct hit points</th>
                    <th>Total Fielding points</th>
                    </tr>
                </thead>
                <tbody>
                {dailyPlayerScores && dailyPlayerScores.map((element,index) => { 
                    return <tr key = {index}>
                        <td>{element.dailyPlayerPointsPK.gameNum}</td>
                        <td>{element.dailyPlayerPointsPK.playerName}</td>
                        <th>{element.totalGamePoints}</th>
                        <td>{element.assignedTo}</td>
                        <td>{element.runsScored}</td>
                        <td>{element.ballsFaced}</td>
                        <td>{element.strikeRate}</td>
                        <td>{element.wasNO}</td>
                        <td>{element.runsPoints}</td>
                        <td>{element.foursPoints}</td>
                        <td>{element.sixesPoints}</td>
                        <td>{element.runsBonus}</td>
                        <td>{element.strikeRateBonus}</td>
                        <th>{element.battingPoints}</th>
                        <td>{element.runsConceded}</td>
                        <td>{element.ballsBowled}</td>
                        <td>{element.wicketsTaken}</td>
                        <td>{element.economy}</td>
                        <td>{element.wicketPoints}</td>
                        <td>{element.economyBonus}</td>
                        <td>{element.hatrickBonus}</td>
                        <td>{element.maidenOverBonus}</td>
                        <td>{element.lbwOrBldPoints}</td>
                        <th>{element.bowlingPoints}</th>
                        <td>{element.catchesPoints}</td>
                        <td>{element.stumpingPoints}</td>
                        <td>{element.directHitPoints}</td>
                        <th>{element.fieldingPoints}</th>
                    </tr>       
                })}
                </tbody>
                </Table>
       
      </div>
    );
  }
}

export default DailyPlayerScores;
