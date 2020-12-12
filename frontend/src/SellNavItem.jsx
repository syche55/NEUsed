import React from 'react';
import { NavItem } from 'react-bootstrap';
import withToast from './withToast.jsx';
import AuthContext from './auth-context.js';
import {LinkContainer} from "react-router-bootstrap";

class SellNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.warning = this.warning.bind(this);
    }

    static contextType = AuthContext;

    warning() {
        const { showError } = this.props;
        showError('Must sign in before creating a new post!');
    }


    render() {
        const { signedIn } = this.context;
        if (!signedIn) {
            return (
                <>
                    <NavItem onClick={this.warning}>
                        Sell
                    </NavItem>
                </>
            );
        }
        return (
            <>
                <LinkContainer to="/sell">
                    <NavItem>Sell</NavItem>
                </LinkContainer>
            </>
        );
    }
}
export default withToast(SellNavItem);
