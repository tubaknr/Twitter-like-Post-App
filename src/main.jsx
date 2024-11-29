import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Posts, { loader as PostsLoader} from './routes/Posts.jsx'
import NewPost, { action as newPostAction } from './routes/NewPost.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './routes/RootLayout.jsx'
import PostDetails, { loader as postDetailsLoader} from './routes/PostDetails.jsx'

// LOAD = FETCH DATA
// ACTION = POST DATA

const router = createBrowserRouter([
  { path: '/', 
    element: <RootLayout />, 
    children: [
        { path: '/', 
          element: <Posts />, // DATAYI ÇEKTİKTEN SONRA YÜKLENİR.
          loader: PostsLoader, // React, <Posts />'u yüklemeden ÖNCE POSTSLOADER'I ÇEKER, DATAYI ÇEKTİKTEN SONRA POSTS'U YÜKLER. 
          // BU YÜZDEN YAVAŞ BİR BACKEND YOKSA GÜZEL BİR ÇÖZÜMDÜR. AMA BACKEND YAVAŞ AÇLIŞAN BİR BACKEND İSE, 
          // YÜKELME ESNASINDA BİR ANLIK SAYFADA HİÇBİR ŞEY GÖRÜNMEZ, YÜKLER, SONRA GÖSTERİR. 
          children: [
              { path: '/create-post', 
                element: <NewPost />,
                action: newPostAction,
              }, // NEWPOST'DA DATA ÇEKİLMESİ, BİR ÜSTTEKİ ROUTER'DAN (POSTS) USELOADERDATA() İLE YAPILMAKTADIR. 
              {
                path: '/:postId',
                element: <PostDetails />,
                loader: postDetailsLoader,
              }
            ] 
        },
    ] 
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
