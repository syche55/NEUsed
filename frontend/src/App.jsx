import './App.css';
import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown, Grid, Col,
  MenuItem, Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Discover from "./Discover.jsx";
import Contents from "./Contents.jsx";

function NavBar() {
    return (
        <Navbar>
            <Navbar.Header>
              <Navbar.Brand>NEUsed</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/discover/">
                    <NavItem>Discover</NavItem>
                </LinkContainer>
            </Nav>

            <Nav pullRight>
                <LinkContainer to="/user">
                    <MenuItem>User</MenuItem>
                </LinkContainer>
                <LinkContainer to="/about">
                    <MenuItem>About</MenuItem>
                </LinkContainer>
            </Nav>
      </Navbar>
    );
}

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <Grid fluid bsClass="contents">
                    <Contents />
                </Grid>
            </div>
        );
    };
}

