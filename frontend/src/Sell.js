import React from 'react';
import Form from './components/Form/Form';
import withToast from './withToast';
import authContext from './auth-context';
import { BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom';

class Sell extends React.Component {
    constructor(props) {
        super(props);
        this.warning = this.warning.bind(this);
    }

    static contextType = authContext;

    warning() {
        const { showError } = this.props;
        showError('test');
    }

    render(){
        console.log("here " + this.context.signedIn);
        if (this.context.signedIn) {
            return (
                <div >
                    <Form
                    />
                </div>
            );
        }else{
            return(
                <div>
                </div>
                //     <BrowserRouter>
                //     <React.Fragment>
                //     <Redirect from="/sell" to="/discover"/>
                //     </React.Fragment>
                //   </BrowserRouter>

            )

        }
    }

}

export default withToast(Sell);
