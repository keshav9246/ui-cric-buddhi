import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'



class Allocations extends Component{

  state = {
            allocations: [],
            currentUserEmail: ''
        };

        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
        {
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
          },()=>{ this.getAllocations()});
        }
    }     

    getAllocations = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch( "https://cric-fap.herokuapp.com/v1/iplt20/allocations", requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                allocations: result
            })})
            .catch(error => console.log('error', error));
    }

    getAllocationsByName = (name) => {
        console.log(name+"NAMEEE")
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          fetch( "https://cric-fap.herokuapp.com/v1/iplt20/allocationsByName?userId="+name, requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                allocations: result
            })})
            .catch(error => console.log('error', error));
    }

    render(){
        const {
            allocations
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Player Allocations
                </Button>
                {/* <DropdownButton id="dropdown-basic-button" title="Kiske Dekhne hain ?">
                    <Dropdown.Item onSelect={() => this.getAllocations()}> All</Dropdown.Item>
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
                </DropdownButton> */}
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Game #</th>
                    <th>Player</th>
                    <th>
                    <DropdownButton id="dropdown-basic-button" variant="warning" title="Kiske Dekhne hain ?">
                        <Dropdown.Item onSelect={() => this.getAllocations()}> All</Dropdown.Item>
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
                    </tr>
                </thead>
                <tbody>
                {allocations && allocations.map((element) => { 
                    return <tr key = {element.allocationsPK}>
                        <td>{element.allocationsPK.gameNum}</td>
                        <td>{element.allocationsPK.userId}</td>
                        <td>{element.allocationsPK.playerName}</td>
                        <td>{element.points}</td>
                    </tr>       
                })}
                </tbody>
                </Table>
        </div>

    
        )
    }



}

export default Allocations;
    