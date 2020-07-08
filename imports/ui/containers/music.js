import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import './css/profile.css';
import Music from "../../models/music";
import {Button, Icon} from "antd";



class music extends Component {

    setCurrentPlayingMusic = musicFile => {
        Session.set('currentMusic', null);
        Meteor.setTimeout(()=>Session.set('currentMusic', musicFile), 1000);
    };

    render() {
        return (
            <div style={{padding: 25, height: window.innerHeight, overflow: "auto"}}>
                {this.props.music&&this.props.music.map((music, id)=>(
                    <div style={{width: 600}} key={id}>
                        <div style={{display:"inline-block", marginRight: 25, marginTop: 25}}>
                            <Button type="default" onClick={()=>this.setCurrentPlayingMusic(music)}>
                                <Icon type="caret-right" />
                            </Button>
                        </div>

                        <div className="profileMusicTitle">{music.meta.trackName}</div>

                    </div>
                ))}
                </div>
        );
    }
}

export default withTracker(() => {
    return {
        music: Music.find().fetch(),
    };
})(music);