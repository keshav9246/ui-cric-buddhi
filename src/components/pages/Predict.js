import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';



let flag = false;
class Predict extends Component {

    constructor() {
        super();
        this.state = {
          responseData: [],
          sucesssMesssage: "nothing",
          currentUserEmail: '',
          showToast: false
        };
      }

    componentDidMount(){
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
    });
        this.getGamesToday();
    }

    
    // getGamesToday = () => {
    //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //     const url = "https://cric-fap.herokuapp.com/v1/iplt20/gamesToday";
        
        
    

    //     // this.setState({
    //     //     responseData: [1,2,3]
    //     // }, () => {
    //     //            flag = true;
    //     //           })
    //    };

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

        let response = await fetch(proxyurl+url);
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
  .then(() => this.setState({successMessage:"Your prediction was submitted successfully for game"+gameNum, showToast:true}))
  .catch(error => this.setState({successMessage:"Your prediction was NOT submitted successfully. Error message is "+error, showToast:true}));
  
    }
    

    render(){
        const {
            responseData,
            successMessage,
            currentUserEmail,
            showToast,
          } = this.state;
          console.log(flag)

        return(
            <div>
              <Container>
              <Row>
            
                {showToast && 
                <Toast delay={2000} autohide>
                  <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Success Message</strong>
                    <small>11 mins ago</small>
                  </Toast.Header>
                 <Toast.Body>{successMessage}</Toast.Body>
                </Toast>
                }
                
             {responseData && responseData.map(element => { 
            
                  return <Col> <Card key={element.gameNum} style={{ width: '18rem' }}>
                  <Card.Body>
                  <Card.Title>Game number {element.gameNum}</Card.Title>
                  <Badge variant="secondary">Predict your winner</Badge>
                    <Card.Subtitle className="mb-2 text-muted">Predict your winner</Card.Subtitle>
                    <Card.Title>
                        {element.team1} vs {element.team2}
                    </Card.Title>
                    <Card.Text>
                        Who will win according to you ? A click on either link would submit your vote ;)
                    </Card.Text>

                    <React.Fragment>
                    <Button href="#" onClick = {() => this.handlePredictions(element.gameNum,currentUserEmail,element.team1)}>{element.team1}</Button> </React.Fragment>
                    <React.Fragment> <Button href="#" onClick = {() => this.handlePredictions(element.gameNum,currentUserEmail,element.team2)}>{element.team2}</Button> </React.Fragment>
                    
                    {/* <Card.Link href = "#" onClick = {this.handlePredictions(element.gameNum,currentUserEmail,element.team1)}>{element.team1}</Card.Link>
                    <Card.Link href = "#" onClick = {this.handlePredictions(element.gameNum,currentUserEmail,element.team2)}>{element.team2}</Card.Link>   */}
                  </Card.Body>
                </Card>
                </Col>
                    })
             }
               </Row>
</Container>

               
            
                
            </div> 
        );
    }

    
 
}

export default Predict;