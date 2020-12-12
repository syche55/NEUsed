import './App.css';
import React from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown, Grid, Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from "./Contents.jsx";
import SignInNavItem from "./SignInNavItem.jsx";
import AuthContext from "./auth-context";

function NavBar({ user, onUserChange }) {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>NEUsed</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to="/discover/">
                    <NavItem>Discover</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <LinkContainer to="/sell">
                    <NavItem>Sell</NavItem>
                </LinkContainer>
                <SignInNavItem user={user} onUserChange={onUserChange} />
                <LinkContainer to="/about">
                    <NavItem>About</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: { signedIn: false } };
        this.onUserChange = this.onUserChange.bind(this);
    }

    static contextType = AuthContext;

    async componentDidMount() {
        const apiEndpoint = process.env.REACT_APP_UI_AUTH_ENDPOINT;
        const response = await fetch(`${apiEndpoint}/user`, {
            method: 'POST',
            credentials: "include"
        });
        const body = await response.text();
        console.log(body);
        const result = JSON.parse(body);
        const { signedIn, givenName, email } = result;
        this.context.email = email;
        this.context.signedIn = signedIn;
        this.context.givenName = givenName;
        this.setState({ user: {signedIn, givenName, email } });
    }

    onUserChange(user) {
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        console.log(user);
        return (
            <div className="App">
                <NavBar user={user} onUserChange={this.onUserChange} />
                <Grid fluid bsClass="contents">
                    <Contents />
                </Grid>
            </div>
        );
    };
}

