import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'



class Assignments extends Component{

  state = {
            assignments: [],
            currentUserEmail: ''
        };

        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
        {
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            //totalGames: [1,2,3,4,5],
          },()=>{ this.getAssignments()});
        }
    }     

    getAssignments = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch( "https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/assignments", requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                    assignments: result,
              
            })})
            .catch(error => console.log('error', error));
    }

    getAllocationsByName = (name) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          fetch( "https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/allocationsByName?userId="+name, requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                allocations: result
            })})
            .catch(error => console.log('error', error));
    }
    getAllocationsByGame = (game) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          fetch( "https://ws-crickshetra-d4cea40c595e.herokuapp.com/v1/iplt20/getAssignments?gameNum="+game, requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                    assignments: result
            })})
            .catch(error => console.log('error', error));
    }

    render(){
        const {
            assignments,
            totalGames
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Player Assignments
                </Button>
              
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    {/* <tr>
                    <th>
                    <DropdownButton id="dropdown-basic-button" variant="warning" title="Number yaad hai?">
                    <Dropdown.Item onSelect={() => this.getAllocations()}>Sari</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(1)}>1</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(2)}>2</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(3)}>3</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(4)}>4</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(5)}>5</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(6)}>6</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(7)}>7</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(8)}>8</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(9)}>9</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(10)}>10</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(11)}>11</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(12)}>12</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(13)}>13</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(14)}>14</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(15)}>15</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(16)}>16</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(17)}>17</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(18)}>18</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(19)}>19</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(20)}>20</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(21)}>21</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(22)}>22</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(23)}>23</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(24)}>24</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(25)}>25</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(26)}>26</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(27)}>27</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(28)}>28</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(29)}>29</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(30)}>30</Dropdown.Item>
                    </DropdownButton>
                    </th>
                    <th>Player</th>
                    <th>
                    <DropdownButton id="dropdown-basic-button" variant="warning" title="Kiske Dekhne hain ?">
                        <Dropdown.Item onSelect={() => this.getAllocations()}> Sabke bc</Dropdown.Item>
                        <Dropdown.Item onSelect={() => this.getAllocationsByName("Akash")}> Akash</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Devang")}>Devang</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Keyur")}>Keyur</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Keshav")}>Keshav</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Parth")}>Parth</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Deepu")}>Deepu</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Lakhan")}>Lakhan</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Sid")}>Sid</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Sachin")}>Sachin</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Swapnil")}>Swapnil</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Ved")}>Ved</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Dhruvik")}>Dhruvik</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Tanmay")}>Tanmay</Dropdown.Item>
                    </DropdownButton>
                    </th> 
                    
                    <th>Player Score</th>
                    </tr>*/}
                    <th>Maniac</th>
                    <th>Game</th>
                    <th>Main </th>
                    <th>Backup</th>
                    <th>Rival Backup</th>
                </thead> 
                <tbody>
                {assignments && assignments.map((element) => { 
                    return <tr key = {element.dailyPlayerAllocationsPK}>
                        <td>{element.dailyPlayerAllocationsPK.user}</td>
                        <td>{element.dailyPlayerAllocationsPK.gameNum}</td>
                        <td>{element.main}</td>
                        <td>{element.backUp}</td>
                        <td>{element.rivalBackUp}</td>
                    </tr>       
                })}
                </tbody>
                </Table>
        </div>

    
        )
    }



}

export default Assignments;
    