import { useState } from "react";
import Post from "./Post";
import classes from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";

function PostsList({isPosting, onStopPosting}){
    // Lifting state up 
    // const [ enteredBody, setEnteredBody ] = useState('');
    // const [ author, setAuthor ] = useState('');


    // function bodyChangeHandler(event){
    //     setEnteredBody(event.target.value);
    // }

    // function authorChangeHandler(event){
    //     setAuthor(event.target.value);
    // }

    const [ posts, setPosts ] = useState([]);

    function addPostHandler(postData){
        // new state is based on existing state=[postData, ...posts], you should actually pass a fcn to setPosts.
        // yani aşağıdaki ahliyle olmaz:
        // setPosts([postData, ...posts]); // ...posts=>eski postlar
        // ne zaman new state, old state'e dayanır olsa bu şekilde fcn vermek gerekir. arrow fcn olabilir.
        setPosts((existingPosts)=>[postData, ...existingPosts]);
    }


    let modalContent;
    if(isPosting){
        modalContent = 
            (<Modal onClose={onStopPosting}>
                <NewPost 
                    // onBodyChange={bodyChangeHandler} 
                    // onAuthorChange={authorChangeHandler}
                    onCancel={onStopPosting}
                    onAddPost={addPostHandler}/>
            </Modal>) 
    }

    return(
        <>
        {modalContent}
        {posts.length > 0 &&
        <ul className={classes.posts}>
            {/* <Post author={author} body={enteredBody}/> */}
            {/* <Post author="Neso" body="ghtjyhtg"/> */}
            {posts.map((post) => <Post key={post.body} author={post.author} body={post.body}/>)}
        </ul>}
        
        {posts.length === 0 && 
            <div style={{textAlign: "center", color:'white'}}>
                <h2>There is no posts yet.</h2>
                <p>Start adding some!</p>
            </div>
        }
        </>
    )
}

export default PostsList;