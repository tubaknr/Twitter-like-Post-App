import classes from "./NewPost.module.css";
import { useState } from "react";
// import { useState } from 'react';

function NewPost(props){
    const [ enteredBody, setEnteredBody ] = useState('');
    const [ author, setAuthor ] = useState('');


    function bodyChangeHandler(event){
        setEnteredBody(event.target.value);
    }

    function authorChangeHandler(event){
        setAuthor(event.target.value);
    }

    function submitHandler(event){
        event.preventDefault() // normalde submit->http request atar server a. sayfa yenilenir. ama React bir frontend app, backend değil. backend emrini halledemez. o yüzden bunu engelliyoruz.
        const postData = { body: enteredBody,
                           author: author }

        // console.log(postData);
        props.onAddPost(postData);
        onCancel();

    }


    return(
        <>
            <form className={classes.form} onSubmit={submitHandler}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" required rows={6} cols={25} onChange={bodyChangeHandler}></textarea>
                </p>
                <p>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" required onChange={authorChangeHandler}></input>
                </p>
                <p className={classes.actions}>
                    <button type='button' onClick={props.onCancel}>Cancel</button>
                    <button>Submit</button>
                </p>

            </form>
        </>
    )
};

export default NewPost;