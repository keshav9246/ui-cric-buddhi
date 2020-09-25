import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class AllPlayers extends Component{

  state = {
            allUsers: [],
            currentUserEmail: ''
        };

        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
        {
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
          },()=>{ this.getAllUsers()});
        }
    }     

    getAllUsers = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          const proxyurl = "https://cors-anywhere.herokuapp.com/";

          fetch(proxyurl + "https://cric-fap.herokuapp.com/v1/iplt20/fetchPlayers", requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({
                allUsers: result
            })})
            .catch(error => console.log('error', error));
    }


    render(){
        const {
            allUsers
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Daily Predictions for all Maniacs
                </Button>
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Role</th>
                    <th>Scores list</th>
                    <th>Total Score</th>
                    </tr>
                </thead>
                <tbody>
                {allUsers && allUsers.map((element,idx) => { 
                    return <tr key = {element.player_name}>
                         <td>{idx}</td>
                        <td>{element.player_name}</td>
                        <td>{element.team}</td>
                        <td>{element.playerRole}</td>
                        <td>{element.stringOfScores}</td>
                        <td>{element.score}</td>
                    </tr>       
                })}
                </tbody>
                </Table>
            
        
        </div>

    
        )
    }



}

export default AllPlayers;
    