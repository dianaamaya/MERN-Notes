/**
 * component to create/update notes
 */
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

    //define state
    state = {
        users: [],
        userSeletected: "",
        date: new Date(),
        title: "",
        content: "",
        editing: false,
        _id: ""
    }

    //get data when component has been rendered
    async componentDidMount(){
        this.getUsers();
        this.updateNote();
    }

    // funtion to update a note
    updateNote = async () => {

        const id = this.props.match.params.id;       

        if( id ) {
            const res = await axios.get(`http://localhost:4000/api/notes/${id}`);

            this.setState({
                userSeletected: res.data.author,
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                editing: true,
                _id: id,
           })            
        }
             
    }

    //get all users from database
    getUsers = async () => {
        const res= await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSeletected: res.data[0].username
        });
    }

    // if note is being updated just request to the server to update that note,
    // in other case, note will be registred as a new one
    setNote = async ( e ) => {
        e.preventDefault();

        const newNote= {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSeletected
        }

        if(this.state.editing){
            await axios.put(`http://localhost:4000/api/notes/${this.state._id}`, newNote );
        }
        else {
            await axios.post('http://localhost:4000/api/notes', newNote );
        }
       
        
        window.location.href = "/";
        
    }

    // when fields have other value, update the state
    onChange = ( e ) => {
        this.setState({
            [e.target.name] : e.target.value            
        });
    }

    //when date is changing, update state
    onChangeDate = date => {
        //console.log(date);
        this.setState({
            date:date
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a note</h4>
                    <form onSubmit={ this.setNote }>

                        <div className="form-group">
                            <select className="form-control" 
                                    name="userSeletected" 
                                    value= { this.state.userSeletected }
                                    onChange= { this.onChange }>
                                {
                                    this.state.users.map( (user, i) => (
                                        <option key={i} value={user} >
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Title"
                                name="title"
                                value={ this.state.title }
                                required
                                onChange={ this.onChange }/>
                        </div>

                        <div className="form-group">
                            <textarea 
                                name="content" 
                                value={ this.state.content }
                                className="form-control"
                                placeholder="Content"
                                required
                                onChange={ this.onChange }>
                            </textarea>
                        </div>

                        <div className="form-group">
                            <DatePicker
                                className="form-control"
                                name="date"
                                selected={ this.state.date }
                                onChange= { this.onChangeDate }
                                />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
