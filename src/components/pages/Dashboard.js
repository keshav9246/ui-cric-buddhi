import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';



class Dashboard extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    currentUser: [],
    fantasyPointsTable: [],
    predictionPointsTable: [],
    predictionRank:0,
    dream18Rank:0,
};

   componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    if(idToken && idToken.idToken && idToken.idToken.claims)
    {
         this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        }, ()=> {
            this.getCurrentUser();
        });
       
    }
    //await this.getAllUsers();
     this.getFantasyPointsTable();
     this.getPredictionPointsTable();

  }

  getAllUsers = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
      fetch("https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/allUsers", requestOptions)
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
//       await fetch(proxyurl+"https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/userDetails?userId="+userId, requestOptions)
//         .then(response => response.text())
//         .then(result => this.setState({currentUser: result}),() => console.log(this.state.currentUser))
//         .catch(error => console.log('error', error));
//     // let response = await fetch(proxyurl+"https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/userDetails?userId="+userId);
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
       fetch("https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/userDetails?userId="+userId, requestOptions)
        .then(response => response.text())
        .then(result => {result = JSON.parse(result); console.log(result); this.setState({currentUser: result})})
        .catch(error => console.log('error', error));
    // let response = await fetch(proxyurl+"https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/userDetails?userId="+userId, requestOptions);
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
      
    //   fetch(proxyurl+"https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/fantasyPointsTable", requestOptions)
    //     .then(response => response.text())
    //     .then(result => this.setState({fantasyPointsTable: result}))
    //     .catch(error => console.log('error', error));

        let response = await fetch("https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/fantasyPointsTable", requestOptions);
        let result = await response.json();
        result.map((element,index) => {
            console.log(element.userName, this.state.currentUserName)
            if(this.state.currentUserName == 'Lakhan' && this.state.currentUserName.split(" ")[0] == 'Harsh'){
                this.setState({dream18Rank:index+1}) 
         }
            if(element.userName === this.state.currentUserName.split(" ")[0]){
                   this.setState({dream18Rank:index+1}) 
            }

        })
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
      
    //   fetch(proxyurl+"https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/predictionPointsTable", requestOptions)
    //     .then(response => response.text())
    //     .then(result => this.setState({predictionPointsTable: result}))
    //     .catch(error => console.log('error', error));

        let response = await fetch("https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/predictionPointsTable", requestOptions);
        let result = await response.json();
        result.map((element,index) => {
            console.log(element.userName, this.state.currentUserName)
            if(this.state.currentUserName == 'Lakhan' && this.state.currentUserName.split(" ")[0] == 'Harsh'){
                this.setState({predictionRank:index+1}) 
         }
            if(element.userName === this.state.currentUserName.split(" ")[0]){
                   this.setState({predictionRank:index+1}) 
            }
        })
        this.setState({
            predictionPointsTable: result
        })
  }

  render() {
    const { currentUser,predictionPointsTable,fantasyPointsTable,predictionRank,dream18Rank } = this.state;

    return ( <div>
        <Container>
            <Alert variant="info">
            Votings open until 630 pm. 
            All predictions untill 6:30 pm will be hidden. 
            If your name appears in the Predictions tab, it means your prediction was submitted.</Alert>
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
                    <Row>
                        <Col>
                            <Badge variant="light">{element.predictionScore}</Badge> 
                        </Col>
                        <Col>
                            <Badge variant="light">{predictionRank}</Badge>
                        </Col>
                    </Row>
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
                    <Card.Header>Your Dream20 standings</Card.Header>
                    <Card.Body>
                    <Card.Title>Points and Rank</Card.Title>
                    <h1>
                    <Row>
                        <Col>
                            <Badge variant="light">{element.dream20Score}</Badge> 
                        </Col>
                        <Col>
                            <Badge variant="light">{this.state.dream18Rank}</Badge>
                        </Col>
                    </Row>
                    </h1>
                    </Card.Body>
                    </Card>
                    
                    
                </Col>
            })}
            </Row>
            </Container>
            <Container>

            <Row>
                <Col>
                <Button variant="danger" size="lg" block>
                   <h6>Indian Premier League</h6> 
                </Button>
                <Button variant="success" size="lg" block>
                    Daily Predictions Points Table
                </Button>
                
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
                <Button variant="danger" size="lg" block>
                   <h6> 2022 </h6>
                </Button>
                <Button variant="warning" size="lg" block>
                    Dream 20 Points Table
                </Button>
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
                        <td>{index+1}</td>
                        <td>{element.userName}</td>
                        <td>{element.points}</td>
                        </tr>
                    })}
                    </tbody>
                    </Table>
                    

                </Col> 
            </Row>
            <Row>
                <Col>
                        
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
