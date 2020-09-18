import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


class MyTeam extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    currentUser:[]
  };

  async componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    await this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });

    await this.getCurrentUser();
  }

//   getGamesToday = async  () => {
//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//      const url = "https://cric-fap.herokuapp.com/v1/iplt20/gamesToday";

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
//       await fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/userDetails?userId="+userId, requestOptions)
//         .then(response => response.text())
//         .then(result => this.setState({currentUser: result}),() => console.log(this.state.currentUser))
//         .catch(error => console.log('error', error));
//     // let response = await fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/userDetails?userId="+userId);
//     //     let result = await response.json();
//     //     console.log(result)
//     //     this.setState({
//     //         currentUser: result
//     //     })
//     //     console.log(result)
//   }

  getCurrentUser =  ()=> {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const userId = this.state.currentUserEmail
      console.log(userId);
       fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/userDetails?userId="+userId, requestOptions)
        .then(response => response.text())
        .then(result => {result = JSON.parse(result); console.log(typeof result); this.setState({currentUser: result})})
        .catch(error => console.log('error', error));
    // let response = await fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/userDetails?userId="+userId, requestOptions);
    //     let result = await response.json();
    //     console.log(result)
    //     this.setState({
    //         currentUser: result
    //     })
    //     console.log(result)
  }

  render() {
    const { currentUserEmail, currentUser } = this.state;

  console.log(currentUser[0])
    return (
      <div>
           <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Role</th>
                        <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentUser && currentUser[0] && currentUser[0].mainTeam.map((element,index) => { 
                    return <tr key = {index}>
                        <td>{index}</td>
                        <td>{element.player_name}</td>
                        <td>{element.team}</td>
                        <td>{element.playerRole}</td>
                        <td>{element.score}</td>
                        </tr>
                    })}
                    </tbody>
                    </Table>
       
      </div>
    );
  }
}

export default MyTeam;