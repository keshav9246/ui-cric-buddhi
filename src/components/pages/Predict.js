import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';



let flag = false;
class Predict extends Component {

    constructor() {
        super();
        this.state = {
          responseData: [],
          sucesssMesssage: "nothing",
          currentUserEmail: '',
          showToast: false,
          allUsers:[]
        };
      }

    componentDidMount(){
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
      if(idToken && idToken.idToken && idToken.idToken.claims)
        {
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
    });
        this.getGamesToday();
        this.getAllUsers();
    }}

    
    // getGamesToday = () => {
    //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //     const url = "https://cric-fap.herokuapp.com/v1/iplt20/gamesToday";
        
        
    

    //     // this.setState({
    //     //     responseData: [1,2,3]
    //     // }, () => {
    //     //            flag = true;
    //     //           })
    //    };
    getAllUsers = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");
  
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
  
      var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        };
        
        fetch("https://cric-fap.herokuapp.com/v1/iplt20/allUsers", requestOptions)
          .then(response => response.text())
          .then(result => {result = JSON.parse(result); this.setState({allUsers: result})})
          .catch(error => console.log('error', error));
    }

    getGamesToday = async  () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
         const url = "https://cric-fap.herokuapp.com/v1/iplt20/gamesToday";

         var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");
       
        // fetch(proxyurl+url,{
        //   headers:{myHeaders}
        // })
        // .then((response) => {
        //   return response.json();
        // })
        // .then((json) => {
        //      this.setState({
        //      responseData: json
        //     }, () => {
        //         flag = true;
        //     })
        //   console.log(json);
        // }).catch((error) => {
        //     console.log(error);
        // });

        let response = await fetch(url);
        let result = await response.json();
        console.log(result)
        this.setState({
            responseData: result
        }, () => {
            flag = true
        }
        )
       console.log(result);
    }

    handleVotes = (gameNum, userId, predictedTeam) => {
      console.log(gameNum + " "+ userId + " " +predictedTeam)

      const data = { 
          "gameNum":  gameNum ,
          "userId":userId,
          "predictedTeam":predictedTeam
      };


        const proxyurl = "https://cors-anywhere.herokuapp.com/";
         let url = "https://cric-fap.herokuapp.com/v1/iplt20/submitPrediction";
         fetch(proxyurl + url, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: data.JSON,
        })
        .then((response) => {
          if(!response.ok){ 
            throw new Error(response.status);
          }
          else{ this.setState(
            { successMessage: "Your prediction was submitted successfully"}
            )
          }
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    handlePredictions = (gameNum, userId, predictedTeam) => {
      console.log(gameNum + " "+ userId + " " +predictedTeam)

      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

var raw = JSON.stringify({"gameNum":gameNum,"userId":userId,"predictedTeam":predictedTeam});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let url = "https://cric-fap.herokuapp.com/v1/iplt20/submitPrediction";

fetch(proxyurl+url, requestOptions)
  .then(response => response.text())
  .then(() => this.setState({successMessage:"Your prediction was submitted successfully for Game-"+gameNum, showToast:true}))
  .catch(error => this.setState({successMessage:"Your prediction was NOT submitted successfully. Error message is "+error, showToast:true}));
  
    }
    

    render(){
        const {
            responseData,
            successMessage,
            currentUserEmail,
            showToast,
            allUsers
          } = this.state;
          console.log(flag)

        return(
            <div>
              <Container>
              <Row>
            
                {showToast && 
                <Alert variant='success'>
                        {successMessage}
                </Alert>
                // <Toast delay={2000} autohide>
                //   <Toast.Header>
                //     <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                //     <strong className="mr-auto">Success Message</strong>
                //     <small>11 mins ago</small>
                //   </Toast.Header>
                //  <Toast.Body>{successMessage}</Toast.Body>
                // </Toast>
                }
                
             {responseData && responseData.map((element,index) => { 
            
                  return <Col> 
                          <Card
                            bg='success'
                            key={index}
                            text={'primary' === 'light' ? 'dark' : 'white'}
                            style={{ width: '18rem' }}
                            className="mb-2"
                            >
                            <Card.Header><h3>{element.team1} vs {element.team2}</h3>
                            </Card.Header>
                            <Card.Body>
                            <Card.Subtitle>{element.gameDate}</Card.Subtitle>
                            <Card.Title>Game {element.gameNum} </Card.Title>
                            <Card.Text>
                              Enter your votes here  
                            </Card.Text>
                            <div>                     
                            <React.Fragment> <Button style={{ width: '32%' }} variant = "warning" href="#" onClick = {() => this.handlePredictions(element.gameNum,currentUserEmail,element.team1)}>{element.team1} - {element.team1_votes}</Button></React.Fragment>
                            <React.Fragment> <Button style={{ width: '32%' }} variant = "warning" href="#" onClick = {() => this.handlePredictions(element.gameNum,currentUserEmail,element.team2)}>NOTA-0</Button> </React.Fragment>
                            <React.Fragment> <Button style={{ width: '32%' }} variant = "warning" href="#" onClick = {() => this.handlePredictions(element.gameNum,currentUserEmail,element.team2)}>{element.team2} - {element.team2_votes}</Button> </React.Fragment>
                            </div>
                            </Card.Body>
                        </Card>
                        </Col>
                
                    })
             }
               </Row>
               <Row>
                <Col>
                <Button variant="warning" size="lg" block>
                    One Time predictions - All
                </Button>
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                          <th>#</th>
                        <th>Maniac</th>
                        <th>Power-player</th>
                        <th>Orange cap</th>
                        <th>Purple cap</th>
                        <th>Top 4</th>
                        <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allUsers && allUsers.map((element,index) => { 
                    return <tr>
                        <td>{index+1}</td>
                        <td>{element.userName}</td>
                        <td>{element.powerPlayer}</td>
                        <td>{element.orangeCap}</td>
                        <td>{element.purpleCap}</td>
                        <td>{element.qualifyingTeams}</td>
                        <td>{element.winningTeam}</td>
                        </tr>
                    })}
                    </tbody>
                    </Table>
                        
                </Col>
            </Row>

</Container>

               
            
                
            </div> 
        );
    }

    
 
}

export default Predict;