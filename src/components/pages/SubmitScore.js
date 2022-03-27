import React, { Component } from 'react';
import { render } from "react-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button';


class SubmitScore extends Component{
    super(props);
    state = {
        selectedGame: 0,
        team1Players:[],
        team2Players:[],
        players1Selected: [],
        players2Selected: [],
       
    }

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
          {
      this.setState({
        currentUserEmail: idToken.idToken.claims.email,
      });
     }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(prevState.selectedGame);
        console.log(this.state.selectedGame);
        if(this.state.selectedGame!==0 && prevState.selectedGame !==this.state.selectedGame){
        this.getPlaying11();
        }
    }

    getPlaying11=()=>{

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://cric-fap.herokuapp.com/v1/iplt20/getPlaying11?gameNum=${this.state.selectedGame}`, requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({
              team1Players: result.team1Players,
              team2Players: result.team2Players,
              team1: result.team1,
              team2: result.team2
              })})
            .catch(error => console.log('error', error));
            
        }

    
};
    

export default SubmitScore;