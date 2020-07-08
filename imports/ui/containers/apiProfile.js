import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import './css/mainpage.css';
import Profile from "../../models/profile";
import {Meteor} from "meteor/meteor";


class apiProfile extends Component {

    state = {
        data: null,
    };

    componentDidMount() {
        this.setState({data: this.state.userData});
    }


    render() {

        if (!this.props.userData) {
            return <div>user not found</div>
        }
        return (
            <div style={{fontSize: 25, padding: 25, height: window.innerHeight, overflow: "auto"}}>
                {JSON.stringify(this.props.userData)}
            </div>
        );
    }
}

export default withTracker((props) => {
    const {id} = props.match.params;

    return {
        userData: Profile.findOne({username: id}),
    };
})(apiProfile);