import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class Scores extends Component{

  state = {
            playerScores: [],
            currentUserEmail: ''
        };
      
    
        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims){
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
          },()=>{ this.getScores()});
        }
    }

    getScores = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          fetch("https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/playerScores", requestOptions)
            .then(response => response.text())
            .then(result => { result = JSON.parse(result); this.setState({playerScores: result})})
            .catch(error => console.log('error', error));
    }

    render(){
        const {
            playerScores
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Daily Predictions for all Maniacs
                </Button>
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Game number</th>
                    <th>Player name</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>4's</th>
                    <th>6's</th>
                    <th>Not out ?</th>
                    <th>Balls bowled</th>
                    <th>Runs Given</th>
                    <th>Wickets</th>
                    <th>Bwld/LBW</th>
                    <th>Maidens</th>
                    <th>Hatrick</th>
                    <th>Catches</th>
                    <th>Direct hits</th>
                    <th>Stumpings</th>
                    </tr>
                </thead>
                <tbody>
                {playerScores && playerScores.map((element) => { 
                    return <tr key = {element.gameNum+ element.playerName}>
                        <td>{element.scorePK.gameNum}</td>
                        <td>{element.scorePK.playerName}</td>
                        <td>{element.runsScored}</td>
                        <td>{element.ballsFaced}</td>
                        <td>{element.foursHit}</td>
                        <td>{element.sixesHit}</td>
                        <td>{element.isNotout}</td>
                        <td>{element.ballsBowled}</td>
                        <td>{element.runsConceded}</td>
                        <td>{element.wicketsTaken}</td>
                        <td>{element.bwldLbwCnb}</td>
                        <td>{element.maidenOvers}</td>
                        <td>{element.hatricks}</td>
                        <td>{element.catchesTaken}</td>
                        <td>{element.directHits}</td>
                        <td>{element.stumpings}</td>
                     
                    </tr>       
                })}
                </tbody>
                </Table>
            
        
        </div>

    
        )

}
}
export default Scores;