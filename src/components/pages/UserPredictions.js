import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class UserPredictions extends Component{

  state = {
            userPredictions: [],
            currentUserEmail: ''
        };
      
    
        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
        {
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
          },()=>{ this.getUserPredictions(this.state.currentUserEmail)});
        }
    }

    fetchUserPredictions = (userId) => {
        console.log("user id is "+userId)
        userId = this.state.currentUserEmail
        if(userId != null){
         var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          const proxyurl = "https://cors-anywhere.herokuapp.com/";

          fetch("https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/getPredictions?userId="+userId, requestOptions)
            .then(response => response.text())
            .then((result) => this.setState({
                userPredictions: result
            }))
            .catch(error => console.log('error', error));
        }
        else{
            return null
        }
    }
    getUserPredictions = async (userId) => {
        const {
            currentUserEmail
          } = this.state;

        console.log(this)
        console.log("user id is "+currentUserEmail)
        userId = this.state.currentUserEmail


        //const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/getPredictions?userId="+currentUserEmail;

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

let response = await fetch(url);
let result = await response.json();
console.log(result)
this.setState({
    userPredictions: result
}

)
console.log(result);
return result
    }


    render(){
        const {
            userPredictions
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Daily Predictions for all Maniacs
                </Button>
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Game number</th>
                    <th>Maniac ID</th>
                    <th>Home team</th>
                    <th>Away team</th>
                    <th>Maniac prediction</th>
                    <th>Team Won</th>
                    <th>Max points</th>
                    <th>Points gained</th>
                    </tr>
                </thead>
                <tbody>
                {userPredictions && userPredictions.map(element => { 
                    return <tr key = {element.gameNum+ element.userId}>
                        <td>{element.gameNum}</td>
                        <td>{element.userId}</td>
                        <td>{element.team1}</td>
                        <td>{element.team2}</td>
                        <td>{element.prediction}</td>
                        <td>{element.winningTeam}</td>
                        <td>{element.maxPoints}</td>
                        <td>{element.pointsGained}</td>
                    </tr>       
                })}
                </tbody>
                </Table>
            
        
        </div>

    
        )
    }

    

}
export default UserPredictions;