import '../index.css'
import PostsList from '../components/PostsList'
import { Outlet } from 'react-router-dom';

function Posts() {
  // const [ modalIsVisible, setModalIsVisible] = useState(true);

  // function hideModalHandler(){
  //   setModalIsVisible(false);
  // }
  // function showModalHandler(){
  //   setModalIsVisible(true);
  // }

  // POSTS.JSX'İN CHİLDREN'ININ NEREDE RENDER EDİLMESİNİ İSTİYORSAN
  // OUTLET'İ ORAYA KOY. MODAL OLDUĞU İÇİN ÜSTTE RENDER EDİLSİN -> EN ÜSTE KOYDUK.
  return (
    <>
    <Outlet />
    <main>
      <PostsList 
        // isPosting={modalIsVisible} 
        // onStopPosting={hideModalHandler}
      />
    </main>
    </>
  )
}

export default Posts;

export async function loader(){
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts; // REact makes sure that all things in return fcn above, all can reach the resData.posts here. 
  // Also all routes of this page, must be able to reach that data too. 
  // Therefore we type useLoaderData in PostsList() which is the router of this Posts page.
}
