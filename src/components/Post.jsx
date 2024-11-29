// const names = ["Tuba", "Neso"];
import { Link } from "react-router-dom";
import classes from "./Post.module.css";

function Post(props) {
    // const chosenName = Math.random() > 0.5 ? names[0] : names[1];
    return(
        <div className={classes.post}>
            <Link to={props.id}>
                <p className={classes.author}>{props.author}</p>
                <p className={classes.text}>{props.body}</p>
            </Link>
        </div>
    )
}

export default Post;
