import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import './css/mainpage.css';
import {Button} from "antd";


class apiTest extends Component {

    testApi = username => {
        Meteor.call('testApi', username);
    };

    render() {

        return (
            <div style={{fontSize: 25, padding: 25, height: window.innerHeight, overflow: "auto"}}>
                <Button onClick={(()=>this.testApi("fed"))}>TestApi</Button>
            </div>
        );
    }
}

export default withTracker((props) => {
    return {
    };
})(apiTest);