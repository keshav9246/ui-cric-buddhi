 import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'



class Allocations extends Component{

  state = {
            allocations: [],
            currentUserEmail: '',
            totalGames: []
        };

        componentDidMount(){
            const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if(idToken && idToken.idToken && idToken.idToken.claims)
        {
          this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            //totalGames: [1,2,3,4,5],
          },()=>{ this.getAllocations()});
        }
    }     

    getAllocations = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch( "https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/allocations", requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                allocations: result,
                totalGames: [1,2,3,4,5]
            })})
            .catch(error => console.log('error', error));
    }

    getAllocationsByName = (name) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          fetch( "https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/allocationsByName?userId="+name, requestOptions)
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
          fetch( "https://crickshetra-api-706bf9ac0811.herokuapp.com/v1/iplt20/allocationsByGame?gameNum="+game, requestOptions)
            .then(response => response.text())
            .then(result => {result = JSON.parse(result); console.log(typeof result); 
                this.setState({
                allocations: result
            })})
            .catch(error => console.log('error', error));
    }

    render(){
        const {
            allocations,
            totalGames
          } = this.state;


        return( <div>
                <Button variant="success" size="lg" block>
                    Player Allocations
                </Button>
              
               <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
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
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(31)}>31</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(32)}>32</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(33)}>33</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(34)}>34</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(35)}>35</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(36)}>36</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(37)}>37</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(38)}>38</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(39)}>39</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(40)}>40</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(51)}>51</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(52)}>52</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(53)}>53</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(54)}>54</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(55)}>55</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(56)}>56</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(57)}>57</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(58)}>58</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(59)}>59</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(60)}>60</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(61)}>61</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(62)}>62</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(63)}>63</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(64)}>64</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(65)}>65</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(66)}>66</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(67)}>67</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(68)}>68</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(69)}>69</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(70)}>70</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(71)}>71</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(72)}>72</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(73)}>73</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(74)}>74</Dropdown.Item>
                    <Dropdown.Item onSelect={() =>this.getAllocationsByGame(75)}>75</Dropdown.Item>

                    
                    </DropdownButton>
                    </th>
                    <th>Player</th>
                    <th>
                    <DropdownButton id="dropdown-basic-button" variant="warning" title="Kiske Dekhne hain ?">
                        <Dropdown.Item onSelect={() => this.getAllocations()}> Sabke bc</Dropdown.Item>
                        <Dropdown.Item onSelect={() => this.getAllocationsByName("Akash")}> Akash</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Devang")}>Devang</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Aviral")}>Aviral</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Keshav")}>Keshav</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Mohit")}>Mohit</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Gaurav")}>Gaurav</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Pushkar")}>Pushkar</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Sid")}>Sid</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Sachin")}>Sachin</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Swapnil")}>Swapnil</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Kunal")}>Kunal</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Tanmay")}>Tanmay</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Lakhan")}>Lakhan</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Faraz")}>Faraz</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Nikhil")}>Nikhil</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Sehran")}>Sehran</Dropdown.Item>
                        <Dropdown.Item onSelect={() =>this.getAllocationsByName("Ved")}>Ved</Dropdown.Item>
             
                    </DropdownButton>
                    </th>
                    
                    <th>Player Score</th>
                    </tr>
                </thead>
                <tbody>
                {allocations && allocations.map((element) => { 
                    return <tr key = {element.allocationsPK}>
                        <td>{element.allocationsPK.gameNum}</td>
                        <td>{element.allocationsPK.playerName}</td>
                        <td>{element.allocationsPK.userId}</td>
                        
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
    