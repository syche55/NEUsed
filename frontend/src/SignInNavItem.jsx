import React from 'react';
import {
    NavItem, Modal, Button, NavDropdown, MenuItem,
} from 'react-bootstrap';
import withToast from './withToast.jsx';

class SignInNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            disabled: true,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    async componentDidMount() {
        const clientId = "54441280778-h5a5bunqbbob7fhhgocmb4t3pr9kjti9.apps.googleusercontent.com";
        if (!clientId) return;
        window.gapi.load('auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init({ client_id: clientId }).then(() => {
                    this.setState({ disabled: false });
                });
            }
        });
    }

    async signIn() {
        this.hideModal();
        const { showError } = this.props;
        let googleToken;
        try {
            const auth2 = window.gapi.auth2.getAuthInstance();
            const googleUser = await auth2.signIn();
            googleToken = googleUser.getAuthResponse().id_token;
        } catch (error) {
            showError(`Error authentication with Google: ${error.error}`);
        }

        try {
            const apiEndpoint = "http://localhost:8000/auth";
            console.log(apiEndpoint);
            const response = await fetch(`${apiEndpoint}/signin`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ google_token: googleToken }),
            });
            const body = await response.text();
            console.log(body);
            const result = JSON.parse(body);
            const { signedIn, givenName } = result;

            const { onUserChange } = this.props;
            onUserChange({ signedIn, givenName });
        } catch (error) {
            showError(`Error signing into the app: ${error}`);
        }
    }

    async signOut() {
        const apiEndpoint = "http://localhost:8000/auth";
        const { showError } = this.props;
        try {
            await fetch(`${apiEndpoint}/signout`, {
                method: 'POST',
                credentials: 'include',
            });
            const auth2 = window.gapi.auth2.getAuthInstance();
            await auth2.signOut();
            const { onUserChange } = this.props;
            onUserChange({ signedIn: false, givenName: '' });
        } catch (error) {
            showError(`Error signing out: ${error}`);
        }
    }

    showModal() {
        const clientId = "54441280778-h5a5bunqbbob7fhhgocmb4t3pr9kjti9.apps.googleusercontent.com";
        const { showError } = this.props;
        if (!clientId) {
            showError('Missing environment variable GOOGLE_CLIENT_ID');
            return;
        }
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    render() {
        const { user } = this.props;
        if (user.signedIn) {
            return (
                <>
                    <NavItem onClick={this.signOut}>
                        Sign out
                    </NavItem>
                    <NavItem>
                        {user.givenName}
                    </NavItem>
                </>
            );
        }
        const { showing, disabled } = this.state;
        return (
            <>
                <NavItem onClick={this.showModal}>
                    Sign in
                </NavItem>
                <NavItem>
                    Guest
                </NavItem>
                <Modal keyboard show={showing} onHide={this.hideModal} bsSize="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Modal.Body>
                        <Button
                            block
                            disabled={disabled}
                            bsStyle="primary"
                            onClick={this.signIn}
                        >
                            <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Sign In" />
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default withToast(SignInNavItem);