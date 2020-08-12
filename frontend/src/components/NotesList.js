/**
 * Component to display all notes
 */
import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import { Trash, Pencil } from 'react-bootstrap-icons';

export default class NotesList extends Component {

    // define state
    state={
        notes:[]
    }

    // get data when component is rendered
    async componentDidMount () {
        this.getNotes();
    }
    
    // request all notes to the server
    getNotes = async () => {
        const notes = await axios.get('http://localhost:4000/api/notes');
        this.setState({
            notes: notes.data
        });
    }

    // request to the server to delete a note
    deleteNote = async ( id ) => {
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        this.getNotes();
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map( (note, i) => (
                    <div className="col-md-4 p-2" key={i}>
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left mb-0 mt-2">
                                    { note.title }
                                </h5>
                                <div className="float-right">
                                    <Link
                                        className="btn btn-default text-info" 
                                        to={ `/Edit/${note._id}` }>
                                        <Pencil /> 
                                    </Link>
                                    <button 
                                        className="btn btn-default text-danger"
                                        onClick= { this.deleteNote.bind(this, note._id) } >
                                        <Trash/>                                        
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <p> { note.content } </p>
                                <p> { note.author } </p>
                                <p> { format(note.date) } </p>
                            </div>
                            
                        </div>
                    </div>
                    ))
                }
            </div>
        )
    }
}
