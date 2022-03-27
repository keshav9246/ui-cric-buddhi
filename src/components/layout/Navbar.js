import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">

          <Link className="navbar-brand" to="/">
            <Row>
              <Col xs={6} md={4}>
                <Image src="cm.png" rounded height="40px"/>
            
              </Col>
            </Row>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/staff">
                  Staff
                </Link>
              </li> */}
             
              <li className="nav-item">
                <Link className="nav-link" to="/predict">
                  Predict
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/predictions">
                  Predictions
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/myTeam">
                  My Dream Team
              </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/scores">
                   Your Player Points
              </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/assignments">
                  Assignments
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allocations">
                  Allocations
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allPlayers">
                   All Players Rankings
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/playerPoints">
                  Daily Player Points
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/schedule">
                  IPL Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/submit11">
                  Submit11
              </Link>
              </li>
          
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
