import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class Allocations extends Component{

  state = {
            allocations: [],
            currentUserEmail: ''
        };

        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
        {
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
          },()=>{ this.getAllocations()});
        }
    }     

    getAllocations = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          const proxyurl = "https://cors-anywhere.herokuapp.com/";

          fetch( "https://cric-fap.herokuapp.com/v1/iplt20/allocations", requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({
                allocations: result
            })})
            .catch(error => console.log('error', error));
    }


    render(){
        const {
            allocations
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Player Allocations
                </Button>
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Game #</th>
                    <th>User</th>
                    <th>Player</th>
                    <th>Player Score</th>
                    </tr>
                </thead>
                <tbody>
                {allocations && allocations.map((element) => { 
                    return <tr key = {element.allocationsPK}>
                        <td>{element.allocationsPK.gameNum}</td>
                        <td>{element.allocationsPK.userId}</td>
                        <td>{element.allocationsPK.playerName}</td>
                        <td>{element.points}</td>
                    </tr>       
                })}
                </tbody>
                </Table>
            
        
        </div>

    
        )
    }



}

export default Allocations;
    