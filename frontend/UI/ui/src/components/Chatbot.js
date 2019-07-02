import React, {Component} from 'react';
import './Chatbot.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class Chatbot extends Component{

    constructor(props){
        super(props);
        this.state={
            textValue:'',
            chatArray:[{
                from:'chatbot',
                msg:'hi'
            }
            ],
            botmsgs:[],
            errorMsg:''
        };
        this.clickEvent = this.clickEvent.bind(this);
    }

    changeTextValue = e => {
        this.setState({ textValue: e.target.value});
    };

    postUserData =()=>{
        const name={name:this.state.textValue,username:"kliang"};
        try {
            axios.post("https://jsonplaceholder.typicode.com/users", name)
            // upon request is success sent
                .then(res => {
                    // update result in the state.
                    console.log(res)
                });
        } catch (err) {
            console.log(err);
            this.setState({errorMsg: 'Error posting data'});
        }
        this.getUserData();

    };

    postDocumentList =()=>{
        const id={name:this.state.textValue,username:"xinzheng"};
        try {
            axios.post("https://jsonplaceholder.typicode.com/users", id).then(res => {
                console.log(res)
            });
        } catch (err) {
            console.log(err);
            this.setState({errorMsg: 'Error posting document list'});
        }
        this.getDocumentList();
    };


    getUserData = async () => {

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const body = await response.json();
        if (body) {
            this.setState({chatArray:this.state.chatArray.concat({from:'chatbot',msg:body[0].name})});
        } else{
            this.setState({errorMsg: 'Error retrieving data'});
        }
    };


    getDocumentList = async () => {

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const body = await response.json();
        if (body) {
            this.setState({chatArray:this.state.chatArray.concat({from:'chatbot',msg:body[0].name})});
        } else{
            this.setState({errorMsg: 'Error retrieving data'});
        }
    };


    clickEvent = () => {
        this.setState({chatArray:this.state.chatArray.concat({from:'user',msg:this.state.textValue})});
        if(this.state.textValue.includes("!")){
            this.postUserData();
        }
        if(this.state.textValue.includes("DocumentList")){
            this.postDocumentList();
        }


        this.setState({ textValue: ''});
    };

    render() {
        const {textValue,chatArray}=this.state;
        //console.log(this.state.botmsgs);
        //this.state.botmsgs.map(m=>console.log(m.name));
        return (
            <div className="chat_bot">
                <Paper className="root">
                    <Typography variant="h4" component="h4">
                        Chatbot
                    </Typography>
                    <Typography variant="h5" component="h5">
                        Topic Placeholder
                    </Typography>
                    <div className="flex">

                        <div className="chatWindow">
                            {
                                chatArray.length?
                                chatArray.map((chat, i) =>
                                    <div className={chat.from} key={i}>
                                        <Chip label={chat.from} variant="outlined"/>
                                        <Typography variant='body1'>{chat.msg}</Typography>
                                    </div>

                                ):null
                            }
                        </div>

                    </div>


                    <div className="flex2">

                        <TextField
                            label="Type message..."
                            className="chatBox"
                            value={textValue}
                            onChange={this.changeTextValue}
                        />
                        <Button variant="contained" color="primary" className="button" onClick={this.clickEvent}>
                            Send
                        </Button>
                    </div>


                </Paper>
            </div>
        );
    }
}


export default Chatbot;