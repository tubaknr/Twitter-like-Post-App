import classes from "./PostDetails.module.css";
import Modal from "../components/Modal";
import { useLoaderData } from "react-router-dom"; // data çekilecek


function PostDetails(){
    const post = useLoaderData();

    if(!post){
        return(
            <Modal>
                <main className={classes.details}>
                    <h1>Could not find post</h1>
                    <p>Unfortunatey, the requested post could not be found.</p>
                    <p>
                        <Link to=".." className={classes.btn}>
                            Okay
                        </Link>
                    </p>
                </main>
            </Modal>
        )
    }
    return(
        <Modal>
            <main className={classes.details}>
                <p className={classes.author}>{post.author}</p>
                <p className={classes.body}>{post.body}</p>
            </main>
        </Modal>
    )
}

export default PostDetails;


export async function loader({params}){
    const response = await fetch("http://localhost:8080/posts/" + params.postId);
    const resData = await response.json();
    return resData.post;
}

