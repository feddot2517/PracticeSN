import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import {Cascader ,Form, Icon, Input, Button, Card, Spin} from 'antd';
import Message from "../../models/message";
import Profile from "../../models/profile";
import find from "./find";
import "./css/chat.css"

const smile = [
    {
        value: '🦹‍♂️',
        label: '🦹‍♂️',
    },    {
        value: '🥴',
        label: '🥴',
    },    {
        value: '🥵',
        label: '🥵',
    },    {
        value: '🤣',
        label: '🤣',
    },    {
        value: '🥰',
        label: '🥰',
    },    {
        value: '🦹‍♀️',
        label: '🦹‍♀️',
    },
       {
        value: 'MMM',
        label: 'SEX',
    },
];


class Chat extends Component {

    state = {
        userMessage: "",
    };

    read = id => {
        Meteor.call("makeReaded", id);
    };

    addNewMessage = e => {
        if (!this.props.currentUser)
            return;
        const {userMessage} = this.state;
        Meteor.call("addMessage", this.props.currentUser.username, this.props.match.params.id, userMessage);
        this.setState({userMessage: ''})
    };

    onChange = e => {
        this.setState({userMessage: e.target.value})
    };

    onChangeSmile = value => {
        this.setState({userMessage: this.state.userMessage+value})
    };

    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);

        return (
            <div>
                <Input
                    prefix={<Icon type="message" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="message"
                    placeholder="Input your message here"
                    value={this.state.userMessage}
                    onChange={this.onChange}
                    onPressEnter={this.addNewMessage}
                    style={{width: 1000, marginRight: 10, marginLeft:25, marginTop: 25}}
                />
                <Button onClick={this.addNewMessage} type="default"><Icon type="plus" /></Button>


                <Cascader style={{width: 50}} options={smile} onChange={this.onChangeSmile} placeholder="😀"/>


                <div>
                    <div style={{background: '#eeeeee', marginLeft: 25, marginTop: 25, height: window.innerHeight, overflow: "auto"}}>
                        {this.props.yourMessage && this.props.yourMessage.map((message, id) => (
                            <div key={id+1}>
                                {message.username===this.props.currentUser.username && message.targetUsername===this.props.match.params.id&&!message.wasRead?
                                    <div>
                                        <Card style={{background: "rgba(40,0,227,0.11)"}} key={id+1}>
                                            <div style={{
                                                fontSize: '10pt',
                                                display: 'inline-block',
                                                marginRight: 5,
                                                fontFamily: "initial",
                                                float:"right"
                                            }}>{message.createdAt.toLocaleTimeString()}:
                                            </div>
                                            <div style={{color: "black", display: 'inline-block', marginRight: 10, fontSize: '20pt', }}>You:</div>
                                            {message.messageBody==="СЕКАС" &&
                                            <div><img src="https://img-hw.xvideos-cdn.com/videos/thumbslll/32/a9/9e/32a99e12037cd5dd34cfe9f3d1795bf3/32a99e12037cd5dd34cfe9f3d1795bf3.3.jpg" alt="qwe"/></div>
                                            }
                                            <div style={{display: 'inline-block', fontSize: '20pt',}}> {message.messageBody}</div>
                                        </Card>
                                    </div>
                                :""}
                                {message.username===this.props.currentUser.username && message.targetUsername===this.props.match.params.id&&message.wasRead?
                                    <div>
                                        <Card key={id+1}>
                                            <div style={{
                                                fontSize: '10pt',
                                                display: 'inline-block',
                                                marginRight: 5,
                                                fontFamily: "initial",
                                                float:"right"
                                            }}>{message.createdAt.toLocaleTimeString()}:
                                            </div>
                                            <div style={{color: "black", display: 'inline-block', marginRight: 10, fontSize: '20pt', }}>You:</div>
                                            {message.messageBody==="MMM" &&
                                            <div><img src="https://img-hw.xvideos-cdn.com/videos/thumbslll/32/a9/9e/32a99e12037cd5dd34cfe9f3d1795bf3/32a99e12037cd5dd34cfe9f3d1795bf3.3.jpg" alt="qwe"/></div>
                                            }
                                            <div style={{display: 'inline-block', fontSize: '20pt',}}> {message.messageBody}</div>
                                        </Card>
                                    </div>:""}
                                {message.targetUsername===this.props.currentUser.username && message.username===this.props.match.params.id?
                                    <div>
                                        <Card key={id}>
                                            <div style={{
                                                color: 'grey',
                                                fontSize: '10pt',
                                                display: 'inline-block',
                                                marginRight: 5,
                                                fontFamily: "initial",
                                                float:"right"
                                            }}>{message.createdAt.toLocaleTimeString()}:
                                            </div>
                                            <div style={{color: "slategray", display: 'inline-block', marginRight: 10, fontSize: '20pt', }}>{message.username}:</div>
                                            {message.messageBody==="СЕКАС" &&
                                            <div><img src="https://img-hw.xvideos-cdn.com/videos/thumbslll/32/a9/9e/32a99e12037cd5dd34cfe9f3d1795bf3/32a99e12037cd5dd34cfe9f3d1795bf3.3.jpg" alt="qwe"/></div>
                                            }
                                            <div style={{display: 'inline-block', fontSize: '20pt',}}> {message.messageBody}</div>
                                        </Card>
                                        {this.read(message._id)}
                                    </div>
                                    :""}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}
export default withTracker((props)  => {

    const currentUser = Meteor.user();
    if (!currentUser)
        return {};

     return {
        currentUser: Meteor.user(),
         yourMessage: Message.find({},{ sort: { createdAt: -1 } }).fetch(),
     }
})(Chat);
