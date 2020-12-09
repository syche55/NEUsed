import './App.css';
import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown, Grid, Col,
  MenuItem, Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from "./Contents.jsx";
import SignInNavItem from "./SignInNavItem.jsx";

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
                <SignInNavItem />
                <LinkContainer to="/user">
                    <NavItem>User</NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                    <NavItem>About</NavItem>
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

