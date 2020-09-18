import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';


class Dashboard extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    allUsers:[],
    currentUser: [],
    fantasyPointsTable: [],
    predictionPointsTable: [],
    predictionRank:0,
    dream18Rank:0,
};

  async componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    await this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });

    await this.getCurrentUser();
    //await this.getAllUsers();
    await this.getFantasyPointsTable();
    await this.getPredictionPointsTable();

  }

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
      
      fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/allUsers", requestOptions)
        .then(response => response.text())
        .then(result => this.setState({allUsers: result}))
        .catch(error => console.log('error', error));
  }

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
//     //     });
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
  getFantasyPointsTable = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
    //   fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/fantasyPointsTable", requestOptions)
    //     .then(response => response.text())
    //     .then(result => this.setState({fantasyPointsTable: result}))
    //     .catch(error => console.log('error', error));

        let response = await fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/fantasyPointsTable", requestOptions);
        let result = await response.json();
        console.log(result)
        this.setState({
            fantasyPointsTable: result
        })
  }

  getPredictionPointsTable = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
    //   fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/predictionPointsTable", requestOptions)
    //     .then(response => response.text())
    //     .then(result => this.setState({predictionPointsTable: result}))
    //     .catch(error => console.log('error', error));

        let response = await fetch(proxyurl+"https://cric-fap.herokuapp.com/v1/iplt20/predictionPointsTable", requestOptions);
        let result = await response.json();
        result.map((element,index) => {
            if(element.userName === this.state.currentUserEmail){
                   this.setState({predictionRank:index+1}) 
            }
        })
        console.log(result)
        this.setState({
            predictionPointsTable: result
        })
  }



  render() {
    const { currentUserEmail, allUsers, currentUser,predictionPointsTable,fantasyPointsTable } = this.state;

    console.log(predictionPointsTable)    
    return ( <div>
        <Container>
            <Row>
            {currentUser && currentUser.map((element,index) => { 
              return  <Col>
                    <Card
                    bg='success'
                    key={index}
                    text={'primary' === 'light' ? 'dark' : 'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Header>Your Prediction standings</Card.Header>
                    <Card.Body>
                    <Card.Title>Points and Rank</Card.Title>
                    <h1>
                        <Badge variant="light">{element.predictionScore}</Badge>
                    </h1>
                    </Card.Body>
                    </Card>
                </Col>
            })}
               {currentUser && currentUser.map((element,index) => { 
              return  <Col>
                    <Card
                    bg='warning'
                    key={index}
                    text={'primary' === 'light' ? 'dark' : 'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                    >
                    <Card.Header>Your Dream18 standings</Card.Header>
                    <Card.Body>
                    <Card.Title>Points and Rank</Card.Title>
                    <h1>
                        <Badge variant="light">{element.dream18Score}</Badge>
                    </h1>
                    </Card.Body>
                    </Card>
                </Col>
            })}
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Maniac</th>
                        <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {predictionPointsTable && predictionPointsTable.map((element,index) => { 
                    return <tr>
                        <td>{index+1}</td>
                        <td>{element.userName}</td>
                        <td>{element.points}</td>
                        </tr>
                    })}
                    </tbody>
                    </Table>

                </Col> 
                <Col>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Maniac</th>
                        <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fantasyPointsTable && fantasyPointsTable.map((element,index) => { 
                    return <tr>
                        <td>{index}</td>
                        <td>{element.userName}</td>
                        <td>{element.points}</td>
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

export default Dashboard;