import React, { Component } from 'react';
import { render } from "react-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Alert from 'react-bootstrap/Alert'





class SubmitScore extends Component {
    constructor(props){
    super(props);
    this.state = {
        showToast: false,
        selectedGame: 0,
        team1Players: [],
        team2Players: [],
        currentPlayerName : '',
        responseMessage:'nothingg here',
        scoreSheet : {
            scorePK :{
                gameNum: '',
                playerName:''
            },
            runsScored: 0,
            ballsFaced:0,
            foursHit:0,
            sixesHit:0,
            isNotout:false,
            ballsBowled:0,
            runsConceded:0,
            dots:0,
            wicketsTaken:0,
            bwldLbwCnb: 0,
            maidenOvers:0,
            hatricks:0,
            catchesTaken:0,
            directHits:0,
            stumpings:0,
        isMOM:false
        }
    }
}

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if (idToken && idToken.idToken && idToken.idToken.claims) {
            this.setState({
                currentUserEmail: idToken.idToken.claims.email,
            });
        }
    }


    updateSelectedGame(gameId){
        const newScoreSheet = {...this.state.scoreSheet}
        newScoreSheet.scorePK["gameNum"] = gameId
        this.setState({
            team1Players:this.state.team1Players,
            team2Players:this.state.team2Players,
            selectedGame: gameId,
            scoreSheet : {...newScoreSheet}
        })
        console.log(this.state.scoreSheet)

    }

    updateIsNotOut(value){
        const newScoreSheet = {...this.state.scoreSheet}
        newScoreSheet.isNotout = value

        this.setState({
            scoreSheet : {...newScoreSheet}
        })
        console.log(this.state.scoreSheet)

    }

    updateMOM(value){
        const newScoreSheet = {...this.state.scoreSheet}
        newScoreSheet.isMOM = value
        this.setState({
            scoreSheet : {...newScoreSheet}
        })
        console.log(this.state.scoreSheet)

    }

    updateCurrentPlayer(name){
        this.setState({
            responseMessage:'',
            scoreSheet : {
                scorePK :{
                    gameNum:this.state.selectedGame,
                    playerName:name
                },
                runsScored: 0,
                ballsFaced:0,
                foursHit:0,
                sixesHit:0,
                isNotout:false,
                ballsBowled:0,
                runsConceded:0,
                dots:0,
                wicketsTaken:0,
                bwldLbwCnb: 0,
                maidenOvers:0,
                hatricks:0,
                catchesTaken:0,
                directHits:0,
                stumpings:0,
            isMOM:false
            }

        })
        console.log(this.state.scoreSheet)
    }

   

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevState.selectedGame);
        console.log(this.state.selectedGame);
        if (this.state.selectedGame !== 0 && prevState.selectedGame !== this.state.selectedGame) {
            this.getPlaying11();
        }
    }

    getPlaying11 = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://18.222.136.173:8080/v1/iplt20/getPlaying11?gameNum=${this.state.selectedGame}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result); console.log(typeof result); this.setState({
                    team1Players: result.team1Players,
                    team2Players: result.team2Players,
                })
            })
            .catch(error => console.log('error', error));

    }

    handleChange = (e) => {
    let value = parseInt(e.target.value)
      console.log(e.target.id,isNaN(value),"e")
      console.log(typeof value, value)

      const newScoreSheet = {...this.state.scoreSheet}

      if(isNaN(value)){
        newScoreSheet[e.target.id] = 0
      
}
      else{
        newScoreSheet[e.target.id] = value
      }
      
        this.setState({
            scoreSheet: {...newScoreSheet}
        },()=>{
            console.log("inside here 167")
            console.log(this.state.scoreSheet);
        });
       
       
    }
    setShow = () => {
        this.setState( {
            responseMessage:''
        })
    }

    handleSubmit= (event) => {
        event.preventDefault();
        console.log("event", event)
        let body = this.state.scoreSheet;
        console.log("bbody",body)

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            };
          
          fetch(`http://18.222.136.173:8080/v1/iplt20/submitScore`, requestOptions)
          .then(response => response.text())
          .then((result) => this.setState({responseMessage:result, showToast:true}))
          .catch(error => this.state.responseMessage=error);
    
          this.setState({
            scoreSheet : {
                scorePK :{
                    gameNum:this.state.scoreSheet.scorePK.gameNum,
                    playerName:""
                },
                runsScored: 0,
                ballsFaced:0,
                foursHit:0,
                sixesHit:0,
                isNotout:false,
                ballsBowled:0,
                runsConceded:0,
                dots:0,
                wicketsTaken:0,
                bwldLbwCnb: 0,
                maidenOvers:0,
                hatricks:0,
                catchesTaken:0,
                directHits:0,
                stumpings:0,
            isMOM:false
            }
          });
          console.log(this.state)
          }
 
    render() {

        let {team1Players, team2Players, currentPlayerName} = this.state;
        const options = [];
        const players1 = [];
        const players2 = [];
        for(let i = 1; i<=74; i++){
            options.push(<Dropdown.Item onClick={()=>this.updateSelectedGame(i)}>{i}</Dropdown.Item>)
        }
        for(let i = 0; i<=team1Players.length; i++){
            players1.push(<Dropdown.Item onClick={()=>this.updateCurrentPlayer(team1Players[i])}>{team1Players[i]}</Dropdown.Item>)
        }
        for(let i = 0; i<=team2Players.length; i++){
            players2.push(<Dropdown.Item onClick={()=>this.updateCurrentPlayer(team2Players[i])}>{team2Players[i]}</Dropdown.Item>)
        }
        // let {team1Players, team1Players,selectedGame, currentPlayerName} = this.state;
        // const options = [];
        // for(let i = 1; i<=team1Players.length; i++){
        //     options.push(<Dropdown.Item onClick={()=>this.state{currentPlayerName:team1Players[i]}}></Dropdown.Item>)
        // }
        return (
            <div>
                <Button variant="success" size="lg" block>
                    Submit Scores
                </Button>


                {this.state.showToast && 
                <Alert variant='success' onClose={() => this.setShow()}>
                        {this.state.responseMessage}
                </Alert>}
                
                <Row>
                    <Col>
                        <DropdownButton  variant="warning" id="gameNum" title={`Select Game`}>
                        {options}
                        </DropdownButton>
                    </Col>
                    <Col>
                        <DropdownButton variant="warning" id="playerName" title={`Select Player`}>
                        {players1}
                        </DropdownButton>
                    </Col>
                    <Col>
                        <DropdownButton variant="warning" id="dropdown-basic-button" title={`Select Player`}>
                        {players2}
                        </DropdownButton>
                    </Col>
                    
                </Row> 
                <div>
                <Form onSubmit = {this.handleSubmit}>

    <Row>
        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default" >Game</InputGroup.Text>
            <FormControl id = "gameNum"  placeholder="Game number" value = {this.state.scoreSheet.scorePK.gameNum} readOnly/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Player</InputGroup.Text>
            <FormControl  id = "playerName" placeholder="Player name" value = {this.state.scoreSheet.scorePK.playerName} readOnly/>
            </InputGroup>
        </Col>
    </Row>

    <Form.Label style={{backgroundColor: "yellow"}}>Batting Points</Form.Label>
    <Row>
        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Runs</InputGroup.Text>
            <FormControl  value = {this.state.scoreSheet.runsScored}
            onChange = {(e) => this.handleChange(e) } id = "runsScored" 
            placeholder="Runs Scored" />
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Balls</InputGroup.Text>
            <FormControl onChange = {(e) => this.handleChange(e)} id = "ballsFaced" placeholder="Balls faced"
            value = {this.state.scoreSheet.ballsFaced}/>
            </InputGroup>
        </Col>
    </Row>

    <Row>
        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Fours</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "foursHit"  placeholder="4s"
            value = {this.state.scoreSheet.foursHit}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Sixes</InputGroup.Text>
            <FormControl onChange = {(e) => this.handleChange(e)} id = "sixesHit"  placeholder="6s"
            value = {this.state.scoreSheet.sixesHit}/>
            </InputGroup>
        </Col>
        <Col>
        <InputGroup className="mb-3">
    <DropdownButton id = "isNotout"
      variant="outline-secondary"
      title="Is Not out"
    >
      <Dropdown.Item href="#" onClick={()=>this.updateIsNotOut('true')} id = 'isNotout' >True</Dropdown.Item>
      <Dropdown.Item href="#" onClick={()=>this.updateIsNotOut('false')} id = 'isNotout' >False</Dropdown.Item>
    </DropdownButton>
    <FormControl value = {this.state.scoreSheet.isNotout}  placeholder="Was he not out" readOnly/>
  </InputGroup>
  </Col>
    </Row>

    <Form.Label style={{backgroundColor: "yellow"}}>Bowling Points</Form.Label>
    <Row>
        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Balls</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "ballsBowled" placeholder="Balls bowled"
            value = {this.state.scoreSheet.ballsBowled}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Runs</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "runsConceded" placeholder="Runs Conceeded"
            value = {this.state.scoreSheet.runsConceded}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Dots</InputGroup.Text>
            <FormControl   onChange = {(e) => this.handleChange(e)} id = "dots" placeholder="Dots bowled" 
            value = {this.state.scoreSheet.dots}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Wickets</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "wicketsTaken" placeholder="Wickets Taken"
            value = {this.state.scoreSheet.wicketsTaken}/>
            </InputGroup>
        </Col>
    </Row>

    <Row>
        

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Bowled or LBWs</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "bwldLbwCnb" placeholder="No. of bold and lbws"
            value = {this.state.scoreSheet.bwldLbwCnb}/>
            </InputGroup>
        </Col>
    
        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Maiden </InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "maidenOvers" placeholder="Maiden kitni daali ?"
            value = {this.state.scoreSheet.maidenOvers}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Hatrick</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "hatricks" placeholder="Hatrick kitni li ?"
            value = {this.state.scoreSheet.hatricks}/>
            </InputGroup>
        </Col>

    </Row>

    <Form.Label style={{backgroundColor: "yellow"}}>Fielding Points</Form.Label>
    <Row>
        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Catches</InputGroup.Text>
            <FormControl onChange = {(e) => this.handleChange(e)} id = "catchesTaken" placeholder="Catches taken"
            value = {this.state.scoreSheet.catchesTaken}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Direct hits</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "directHits" placeholder="Direct hits"
            value = {this.state.scoreSheet.directHits}/>
            </InputGroup>
        </Col>

        <Col>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Stumpings</InputGroup.Text>
            <FormControl  onChange = {(e) => this.handleChange(e)} id = "stumpings" placeholder="Stumpings"
            value = {this.state.scoreSheet.stumpings}/>
            </InputGroup>
        </Col>

        <Col>
        <InputGroup className="mb-3">
    <DropdownButton
      variant="outline-secondary"
      title="MOM"
      id="isMOM" 
    >
      <Dropdown.Item onClick={()=>this.updateMOM('true')} id = 'isMOM' > True</Dropdown.Item>
      <Dropdown.Item onClick={()=>this.updateMOM('false')} id = 'isMOM'>False</Dropdown.Item>
    </DropdownButton>
    <FormControl   placeholder="Man of match" value = {this.state.scoreSheet.isMOM} readOnly/>
  </InputGroup>
        </Col>
    </Row> 
                    <Button variant="success" type="submit" size="lg" block >
                        Submit
  </Button>
                </Form>
                </div>
            </div>
        )
    }
};


export default SubmitScore;