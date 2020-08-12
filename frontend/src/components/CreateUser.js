/**
 * component to create/update users
 */
import React, { Component } from 'react'
import axios from 'axios';

import { Trash, Pencil } from 'react-bootstrap-icons';

export default class CreateUser extends Component {

    //define state
    state = {
        users: [],
        username: "",
        id:""
    }

    // update data when component is rendered
    async componentDidMount(){
        this.getUsers();
    }

    // request all users to the server
    getUsers = async () => {
        const res= await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data,
            username: "", 
            id: "" 
        });
    }

    // update state when fields are changing
    onChangeUserName = ( e ) => {
        this.setState({
            [e.target.name] : e.target.value            
        });
    }

    //create or edit an user
    setUser = async ( e ) => {
        e.preventDefault();
        if(this.state.id){
            await axios.put(`http://localhost:4000/api/users/${this.state.id}`, {
                username: this.state.username
            });
        }
        else {
            await axios.post('http://localhost:4000/api/users', {
                username: this.state.username
            });
        }
        this.getUsers();        
    }

    // request to the server delete an user
    deleteUser = async ( id ) => {
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        this.getUsers();
    }

    // edit an user
    editUser = async ( id ) => {
        const res = await axios.get(`http://localhost:4000/api/users/${id}`);
        this.setState({
            username: res.data.username,
            id: res.data._id          
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create/Edit a user</h3>
                        <form onSubmit= { this.setUser} >
                            <div className="form-group">
                                <input 
                                    name= "username"
                                    value= { this.state.username }
                                    type= "text" 
                                    className= "form-control" 
                                    onChange= { this.onChangeUserName } 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>   
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map( (user, i) => (
                                <li className="list-group-item list-group-item-action"
                                    key={i}>
                                    { user.username }
                                    <div className="float-right">
                                        <span className="text-info mr-3"
                                            onClick = { this.editUser.bind(this, user._id) } >
                                            <Pencil />
                                        </span>
                                        <span className="text-danger"
                                            onClick = { this.deleteUser.bind(this, user._id)} >
                                            <Trash />
                                        </span>
                                    </div>                                   
                                </li>
                            ))
                        }
                    </ul>
                </div>             
            </div>
        )
    }
}
