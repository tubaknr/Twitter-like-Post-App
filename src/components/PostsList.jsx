// React Router client-side'da çalışır, backend'de değil.
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom"; // Bir üstündeki RouterDan gelen datayaı kullanabilmesi gerek!!!! (Posts.jsx'deng elen resData.posts)
import Post from "./Post";
import classes from "./PostList.module.css";

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

    // // INFINITE LOOP: 
    // fetch('http://localhost:8080/posts').then(response => response.json()).then(data => 
        // setPosts(data.posts));
        // INFITNITE LOOP OLMASIN DİYE: USEFFECT()

    const posts = useLoaderData(); // Bir üstündeki RouterDan gelen datayaı kullanabilmesi için.
    //  DATA FETCHED HERE.
    // SO WE DONT NEED POSTS STATE:
    // const [ posts, setPosts ] = useState([]);
    // const [ isFetching, setIsFetching ] = useState(false);

    useEffect(() => { //bu useEffect, her zaman execute edilmiyor. React karar veriyor ne zaman execute edileceğini..
        async function fetchPosts(){
            setIsFetching(true);
            const response = await fetch('http://localhost:8080/posts');
            const resData = await response.json();
            if (!response.ok){
                //Error message
            }
            setPosts(resData.posts);
            setIsFetching(false);
        }
        fetchPosts();

    }, []);
    // useEffect'in içerisinde kullanılan fcn: promise dönememsi gerektiği için:
    // useEffect(async() => {}) gibi yazılmaz!
    // useEffect(() => {
        // async function ..... olarak AYRICA YAZILIR.
    // })

    function addPostHandler(postData){
        // new state is based on existing state=[postData, ...posts], you should actually pass a fcn to setPosts.
        // yani aşağıdaki ahliyle olmaz:
        // setPosts([postData, ...posts]); // ...posts=>eski postlar
        // ne zaman new state, old state'e dayanır olsa bu şekilde fcn vermek gerekir. arrow fcn olabilir.
        
        // fetch is used on browsers. it is not a react feature. used to send http requests.
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setPosts((existingPosts)=>[postData, ...existingPosts]);
    }


    // let modalContent;
    // if(isPosting){ //App.jsx->modalIsVisible
    //     modalContent = 
    //         (<Modal onClose={onStopPosting}>
    //             <NewPost 
    //                 // onBodyChange={bodyChangeHandler} 
    //                 // onAuthorChange={authorChangeHandler}
    //                 onCancel={onStopPosting}
    //                 onAddPost={addPostHandler}/>
    //         </Modal>) 
    // }

    return(
        <>
        {/* {modalContent} */}
        {!isFetching && posts.length > 0 &&
        <ul className={classes.posts}>
            {/* <Post author={author} body={enteredBody}/> */}
            {/* <Post author="Neso" body="ghtjyhtg"/> */}
            {posts.map((post) => 
                <Post key={post.body} author={post.author} body={post.body}/>
            )}
        </ul>}

        {!isFetching && posts.length === 0 && 
            <div style={{textAlign: "center", color:'white'}}>
                <h2>There is no posts yet.</h2>
                <p>Start adding some!</p>
            </div>
        }

        {isFetching && (
            <div style={{textAlign: "center", color:'white'}}>
                <p>Loading posts...</p>
            </div>
        )}
        </>
    )
}

export default PostsList;