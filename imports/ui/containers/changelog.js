import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import './css/mainpage.css';

class changelog extends Component {
    render() {
        return (
            <div style={{fontSize: 25, padding: 25, height: window.innerHeight, overflow: "auto"}}>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.3.0</p>
                </div>

                <div>
                    <p>new design!</p>
                </div>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.2.4</p>
                </div>

                <div>
                    <p>where is version 0.2.3?</p>
                    <p>Last fix for online status</p>
                    <p>this one is definitely last</p>
                    <p>music would be added in 0.2.5</p>
                </div>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.2.2</p>
                </div>

                <div>
                    <p>Online status linked to server time</p>
                </div>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.2.1</p>
                </div>

                <div>
                    <p>Minor fixes for online status</p>
                </div>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.2.0</p>
                </div>

                <div>
                    <p>Minor fixes for online status. Now works on any device</p>
                    <p>Added view for your followers</p>
                    <p>Added user's last seen status</p>
                    <p>User search function temporarily disabled</p>
                    <p>Added test music player</p>
                </div>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.1.1</p>
                </div>

                <div>
                    <p>Added emoji for chat</p>
                    <p>Added view for user photo activity</p>
                    <p>Was added count for new messages</p>
                </div>
                {/**/}
                <div>
                    <p style={{color: "black"}}>ver. 0.1.0</p>
                </div>
                <div>
                    <p>Added chat</p>
                    <p>Some minor fix for profile</p>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
    };
})(changelog);