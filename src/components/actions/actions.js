import axios from "axios";

export const ADD_NOTE = "ADD_NOTE";
export const GET_NOTES = "GET_NOTES";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const FETCHING_NOTES = "FETCHING_NOTES";
export const FETCHED_NOTES = "FETCHED_NOTES";
export const NOTES_FETCHING_ERROR = "NOTES_FETCHING_ERROR";
export const ADDING_NOTE = "ADDING_NOTE";
export const ADDED_NOTE = "ADDED_NOTE";
export const ADDING_NOTE_ERROR = "ADDING_NOTE_ERROR";
export const DELETING_NOTE = "DELETING_NOTE";
export const DELETED_NOTE = "DELETED_NOTE";
export const DELETED_NOTE_ERROR = "DELETED_NOTE_ERROR";
export const UPDATING_NOTE = "UPDATING_NOTE";
export const UPDATED_NOTE = "UPDATED_NOTE";
export const UPDATING_NOTE_ERROR = "UPDATING_NOTE_ERROR";

export const loadNotes = () => dispatch => {
	dispatch({ type: FETCHING_NOTES });
	const promise = axios.get(
		"https://lambda-notes-server-patrick.herokuapp.com/notes"
	);
	promise
		.then(response => {
			dispatch({ type: FETCHED_NOTES, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: NOTES_FETCHING_ERROR, payload: err });
		});
};

export const addNote = note => dispatch => {
	dispatch({ type: ADDING_NOTE });
	console.log(note);
	axios
		.post("https://lambda-notes-server-patrick.herokuapp.com/notes", note)
		.then(response => {
			dispatch({ type: ADDED_NOTE, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: ADDING_NOTE_ERROR, payload: err });
		});
};

export const deleteNote = id => dispatch => {
	dispatch({ type: DELETING_NOTE });
	axios
		.delete(`https://lambda-notes-server-patrick.herokuapp.com/notes/${id}`)
		.then(response => {
			dispatch({ type: DELETED_NOTE, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: DELETED_NOTE_ERROR, payload: err });
		});
};
export const updateNote = note => dispatch => {
	console.log(note);
	const id = note.noteID;
	const title = note.title;
	const body = note.body;
	const updatedNote = { title, body };
	dispatch({ type: UPDATING_NOTE });
	axios
		.put(
			`https://lambda-notes-server-patrick.herokuapp.com/notes/${id}`,
			updatedNote
		)
		.then(response => {
			dispatch({ type: UPDATED_NOTE, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: UPDATING_NOTE_ERROR, payload: err });
		});
};
