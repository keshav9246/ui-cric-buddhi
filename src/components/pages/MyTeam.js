import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


class MyTeam extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    currentUser:[]
  };

   componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    if(idToken && idToken.idToken && idToken.idToken.claims)
        {
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    },()=>{
       this.getCurrentUser();
    });
  }
    
  }

//   getGamesToday = async  () => {
//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//      const url = "https://18.219.229.84/v1/iplt20/gamesToday";

//      var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Access-Control-Allow-Origin", "*");
   
//     // fetch(proxyurl+url,{
//     //   headers:{myHeaders}
//     // })
//     // .then((response) => {
//     //   return response.json();
//     // })
//     // .then((json) => {
//     //      this.setState({
//     //      responseData: json
//     //     }, () => {
//     //         flag = true;
//     //     })
//     //   console.log(json);
//     // }).catch((error) => {
//     //     console.log(error);
//     // });

//     let response = await fetch(proxyurl+url);
//     let result = await response.json();
//     console.log(result)
//     this.setState({
//         responseData: result
//     }, () => {
//         flag = true
//     }
//     )
//    console.log(result);
// }

//   getCurrentUser = async ()=> {
//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//       };
//       const userId = this.state.currentUserEmail
//       console.log(userId);
//       await fetch(proxyurl+"https://18.219.229.84/v1/iplt20/userDetails?userId="+userId, requestOptions)
//         .then(response => response.text())
//         .then(result => this.setState({currentUser: result}),() => console.log(this.state.currentUser))
//         .catch(error => console.log('error', error));
//     // let response = await fetch(proxyurl+"https://18.219.229.84/v1/iplt20/userDetails?userId="+userId);
//     //     let result = await response.json();
//     //     console.log(result)
//     //     this.setState({
//     //         currentUser: result
//     //     })
//     //     console.log(result)
//   }

  getCurrentUser =  () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const userId = this.state.currentUserEmail
      console.log(userId);
       fetch("https://18.219.229.84/v1/iplt20/userDetails?userId="+userId, requestOptions)
        .then(response => response.text())
        .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({currentUser: result})})
        .catch(error => console.log('error', error));
    // let response = await fetch(proxyurl+"https://18.219.229.84/v1/iplt20/userDetails?userId="+userId, requestOptions);
    //     let result = await response.json();
    //     console.log(result)
    //     this.setState({
    //         currentUser: result
    //     })
    //     console.log(result)
  }

  render() {
    const {currentUser } = this.state;

  console.log(currentUser[0])
    return (
      <div>
        <Container>
       
     
        </Container>
        
        <Row><Col>
          <Button variant="success" size="lg" block>
                    My Main Team
                </Button>
           <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Role</th>
                        <th>Scores List</th>
                        <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentUser && currentUser[0] && currentUser[0].mainTeam.map((element,index) => { 
                    return <tr key = {index}>
                        <td>{index+1}</td>
                        <td>{element.player_name}</td>
                        <td>{element.team}</td>
                        <td>{element.playerRole}</td>
                        <td>{element.stringOfScores}</td>
                        <td>{element.score}</td>
                        </tr>
                    })}
                    </tbody>
                    </Table>
                    </Col>
                    </Row>

                    <Row>
                     <Col>
{/* 
                    <Button variant="secondary" size="lg" block>
                    Power Player: {currentUser && currentUser[0] && currentUser[0].powerPlayer}
                </Button> */}
                </Col></Row>
                <Row>
                     <Col>
                                        
                     </Col></Row>
                   
                    <Row>
                     <Col>

                    <Button variant="warning" size="lg" block>
                    My Backup Team
                </Button>
           <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Role</th>
                        <th>Scores list</th>
                        <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentUser && currentUser[0] && currentUser[0].backupTeam.map((element,index) => { 
                    return <tr key = {index}>
                        <td>{index+1}</td>
                        <td>{element.player_name}</td>
                        <td>{element.team}</td>
                        <td>{element.playerRole}</td>
                        <td>{element.stringOfScores}</td>
                        <td>{element.score}</td>
                        </tr>
                    })}
                    </tbody>
                    </Table>

                    </Col>
                    </Row>
       
      </div>
    );
  }
}

export default MyTeam;
