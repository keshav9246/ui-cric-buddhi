import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

class Submit11 extends Component{

constructor(props){
    super(props);
    this.state = {
        selectedGame: 0,
        team1Players:[],
        team2Players:[],
        players1Selected: [],
        players2Selected: [],
        team1:'',
        team2:'',
    }

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
        this.getPlayers();
        }
    }

    getPlayers = ()=> {
        
    
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`https://cric-fap.herokuapp.com/v1/iplt20/getPlayers?gameNum=${this.state.selectedGame}`, requestOptions)
          .then(response => response.text())
          .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({
            team1Players: result.team1Players,
            team2Players: result.team2Players,
            team1: result.team1,
            team2: result.team2
            })})
          .catch(error => console.log('error', error));
      }


    updateSelectedGame(gameId){
        this.setState({
            team1Players:[],
            team2Players:[],
            playersSelected: [],
            selectedGame: gameId,
            team1:'',
            team2:''
        })
    }

    selectPlayers(team, name){
        if(team === 1){
            let {players1Selected} = this.state;
            if(players1Selected.includes(name)){
                let index = players1Selected.indexOf(name);
                players1Selected.splice(index, 1);
            }else{
                players1Selected.push(name)
            }

            this.setState({
                players1Selected
            })

        }else if(team === 2){
            let {players2Selected} = this.state;
            if(players2Selected.includes(name)){
                let index = players2Selected.indexOf(name);
                players2Selected.splice(index, 1);
            }else{
                players2Selected.push(name)
            }

            this.setState({
                players2Selected
            })
        }
    }

    onSubmit= ()=> {
        console.log('team 1 are:')
        console.log(this.state.players1Selected);
        console.log('team 2 are:')
        console.log(this.state.players2Selected);
        console.log('game is');
        console.log(this.state.selectedGame);
        this.submitPlaying11();
        this.setState({
            selectedGame: 0,
            team1Players:[],
            team2Players:[],
            players1Selected:[],
            players2Selected:[],
            team1:'',
            team2:''
        })
    }

    submitPlaying11=()=>{

        let body = {
            gameNum: this.state.selectedGame,
            team1Players: this.state.players1Selected,
            team2Players: this.state.players2Selected,
            team1 : this.state.team1,
            team2: this.state.team2
        };

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            };
          
          fetch(`https://cric-fap.herokuapp.com/v1/iplt20/submitPlaying11`, requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result);})
            .catch(error => console.log('error', error));
    }
    render(){

        let {players1Selected, players2Selected,selectedGame, team1, team2} = this.state;
        const options = [];
        for(let i = 1; i<=74; i++){
            options.push(<Dropdown.Item onClick={()=>this.updateSelectedGame(i)}>{i}</Dropdown.Item>)
        }

        let team1Players = this.state.team1Players;
        team1 = this.state.team1;
        let player1CheckList = [];
        if(team1Players && team1Players.length > 0){
            player1CheckList = team1Players.map(elem => {
                return (
                    <ListGroup.Item variant="info">
                <div style={{display: "flex", width: "100px", height: "50px", justifyContent: "space-around", alignContent: "center"}}>
                    <input type="checkbox" onChange={() => this.selectPlayers(1, elem)} checked={players1Selected.includes(elem)}></input>
                    <p style={{width: "100%"}}>{elem}</p>
                </div>
                </ListGroup.Item>

                );
            });
        }

            let team2Players = this.state.team2Players;
            team2 = this.state.team2;
            let player2CheckList = [];
            if(team2Players && team2Players.length > 0){
                                player2CheckList = team2Players.map(elem => {
                    return (
                        <ListGroup.Item variant="warning">
                        <div style={{display: "flex", width: "100px", height: "50px", justifyContent: "space-around", alignContent: "center"}}>
                        <input type="checkbox" onChange={() => this.selectPlayers(2, elem)} checked={players2Selected.includes(elem)}></input>
                        <p style={{margin: "0"}}>{elem}</p>
                    </div>
                    </ListGroup.Item>);
                });
               
            }

        return(
            <div>
                <Button variant="success" size="lg" block>
                    Submit Playing 11
                </Button>
                <Container>
                <Row>
                    <Col>
                        <DropdownButton id="dropdown-basic-button" title={`Select Game`}>
                        {   options}
                        </DropdownButton>
                    </Col>
                </Row>
                
                 

                    
  
   <div>
    {selectedGame !== 0 && <p>Game {this.state.selectedGame}</p>}
    </div>
    
</Container>

                <Container>
                <Row>
                    <Col>
                        <div>
                        <Button variant="info" size="lg" block>
                        <p>{this.state.team1}</p>
                        </Button>
                         {player1CheckList}
                        </div>
                    </Col>
                    <Col>
                    <div>
                    <Button variant="info" size="lg" block>
                        <p>{this.state.team2}</p>
                        </Button>
                                {player2CheckList}
                        </div>
                    
                    </Col>
                </Row>
                </Container>
              
                <Button variant="warning" size="lg" block onClick={this.onSubmit}>
                    Submit
                </Button>

            </div>
        )
            
    
}


};
export default Submit11;