import Modal from "../components/Modal";
import classes from "./NewPost.module.css";
import { Form, Link, redirect } from "react-router-dom";
 

// REACT'İN FORM'U: REACT BİR FRONTEND OLDUĞU VE İÇERİSİNDE BACKEND OLMADIĞI İÇİN, BACKEND'E POST REQUEST ATILACAĞI ZAMAN,
// BU FORM KULLANILMALI:
// HEM ACTION I ÇAĞIRABİLİR
// HEM BROWSER'IN DEFAULT TAKİ REQUEST HALLETME ZIRVALIKLARINI ENGELLER
// HEM BACKEND İLE ETKİLEŞİME GEÇEBİLİR.
// FORM'UN OLDUĞU ROUTE'A (NEWPOST) ATANAN ACTION FONKSİYONUNU ÇAĞIRIR. 

function NewPost(){
    // SUBMIT IN POST REQUEST İNİ ACTION A TAŞIYINCA: 
    // STATE LERE HANDLER LARA GEREK KAKLMADI:
    // const [ enteredBody, setEnteredBody ] = useState('');
    // const [ author, setAuthor ] = useState('');

    // function bodyChangeHandler(event){
    //     setEnteredBody(event.target.value);
    // }

    // function authorChangeHandler(event){
    //     setAuthor(event.target.value);
    // }

    // function submitHandler(event){
    //     event.preventDefault() // normalde submit->http request atar server a. sayfa yenilenir. ama React bir frontend app, backend değil. backend emrini halledemez. o yüzden bunu engelliyoruz.
    //     const postData = { body: enteredBody,
    //                        author: author }


        // console.log(postData);
        // props.onAddPost(postData); // BU KOD YERİNE DİREK OLARAK DATAYI BURADA POST EDECEĞİZ:
        
        // ACTION A TAŞINMAKTADIR:
        // fetch('http://localhost:8080/posts', {
        //     method: 'POST',
        //     body: JSON.stringify(postData),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }})
        // onCancel();

    return(
        <Modal>
            <Form 
                method="post" // REACT, BURADA POST REQ ATMAZ, 
                              // AMA BİR POST RESPONSE OBJESİ OLUŞTURUR, 
                              // O OBJEYE BU METODU ATAR
                              // ACTION'DA KULLANILMAK ÜZERE. 
                className={classes.form} 
                // onSubmit={submitHandler} // ACTION YAPINCA HANDLER'LARA GEREK KALMADI.
                >
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea 
                        id="body" 
                        required 
                        rows={6} 
                        cols={25} 
                        // onChange={bodyChangeHandler} ACTION YAPINCA: BACKEND'DEKİ İSİMLERİ BURAYA TAŞIMAK GEREK:
                        name="body" //BACKEND'DEKİ POSTS.JSON'DAKİ DATANIN İÇİNDEKİ İSİMLER: BODY, AUTHOR.
                        >
                    </textarea>
                </p>
                <p>
                    <label htmlFor="name">Your name</label>
                    <input 
                        type="text" 
                        id="name" 
                        required 
                        // onChange={authorChangeHandler} ACTION YAPINCA: BACKEND'DEKİ İSİMLERİ BURAYA TAŞIMAK GEREK:
                        name="author" // BACKEND'DEKİ POSTS.JSON'DAKİ DATANIN İÇİNDEKİ İSİMLER: BODY, AUTHOR.
                        >
                    </input>
                </p>
                
                <p className={classes.actions}>
                    <Link 
                        to=".." //bir önceki sayfaya gel
                        type='button' 
                        // onClick={props.onCancel}
                        >
                            Cancel
                    </Link>
                    <button>Submit</button>
                </p>

            </Form>
        </Modal>
    );
};

export default NewPost;


// SUBMIT POST REQUEST'İ
export async function action({request}){
    // User'ın girdiği değerleri kullanmasını sağlamak için:
    const formData = await request.formData(); // .formData() fonksiyonu promise döner -> async await oldu
    const postData = Object.fromEntries(formData) // { body: '...', author: '...' }

    // yuakrıda oluşturulan postData'yı yolla:
    fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return redirect('/'); // response objesi oluşturur ve ana userı sayfaya geri gönderir. 
}
