import React, {Component} from 'react';
import {Icon} from 'antd';
import {withRouter} from "react-router";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import "./containers/css/layout.css"
import Message from "../models/message";
import Friend from "../models/friend";
import Music from "../models/music";
import Profile from "../models/profile";

class CustomLayout extends Component {

    online = () => {
        {this.props.currentUser&&
        Meteor.call('online', this.props.currentUser.username)}
    };

    SNlogout = e => {
        Meteor.logout();
        this.props.history.push("/");
    };

    pushFindFriendsPageInHistory = e => {
        this.props.history.push(`/find`)
    };

    pushMessagePageInHistory = e => {
        this.props.history.push(`/messages`)
    };

    pushProfilePageInHistory = username => {
        this.props.history.push(`/profile/${username}`)
    };

    pushMainPageInHistory = e => {
        this.props.history.push('/')
    };

    render() {
        return (
            <div>
                {/*Layout*/}
                <div className="menu">
                    {this.props.currentMusic &&
                    <div className="musicPlayer">
                        <div style={{position: "center", display: "inline-block", width: 300}}>
                            <div className="track-name">{this.props.currentMusic.meta.trackName}</div>
                            <audio style={{width:250}} controls="controls" autoPlay="autoplay"
                            >
                                <source src={Music.findOne({_id: this.props.currentMusic._id}).link()}
                                        type={this.props.currentMusic.type}/>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    }
                    {this.props.currentUser ?
                        <div className="mainNav">
                            <div onClick={this.pushFindFriendsPageInHistory} className="menuItem">
                                <Icon style={{marginRight: 10}} type="search"/>
                                USERS
                            </div>

                            <div onClick={this.pushMessagePageInHistory} className="menuItem">
                                <Icon style={{marginRight: 10}} type="message"/>
                                DIALOGS
                            </div>

                            <div
                                onClick={() => this.pushProfilePageInHistory(this.props.currentUser && this.props.currentUser.username)}
                                className="menuItem">
                                <Icon style={{marginRight: 10}} type="user"/>
                                PROFILE
                            </div>

                            <div onClick={() => this.props.history.push("/feed")} className="menuItem">
                                <Icon style={{marginRight: 10}} type="profile"/>
                                FEED
                            </div>

                            <div onClick={() => this.props.history.push("/music")} className="menuItem">
                                <Icon style={{marginRight: 10}} type="customer-service"/>
                                MUSIC
                            </div>

                            <div onClick={() => this.props.history.push("/games/test")} className="menuItem">
                                <Icon style={{marginRight: 10}} type="heat-map"/>
                                GAMES
                            </div>

                            <div onClick={() => this.SNlogout()} className="sysMenuItem">
                                <Icon style={{marginRight: 10}} type="logout"/>
                                LOGOUT
                            </div>

                        </div>:

                        <div>
                            <div onClick={() => this.props.history.push("login")} className="sysMenuItem">
                                <Icon style={{marginRight: 10}} type="logout"/>
                                LOGIN
                            </div>
                        </div>
                    }

                </div>

                {/*Content*/}
                <div className="content">
                    {this.props.children}
                </div>

                {/*Online*/}
                {this.online()}
            </div>
        )
    }
}

export default withTracker(() => {

    const currentUser = Meteor.user();

    if (!currentUser)
        return {};

    const message = Message.find({targetUsername: Meteor.user().username, wasRead:false}).fetch().map(u => u.wasRead);

    return {
        currentMusic: Session.get('currentMusic'),
        currentUser: Meteor.user(),
        friendShips: Friend.find({id1: currentUser.username}).fetch(),
        message: message,
    };
})(withRouter(CustomLayout));
