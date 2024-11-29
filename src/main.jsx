import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Posts, { loader as PostsLoader} from './routes/Posts.jsx'
import NewPost from './routes/NewPost.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './routes/RootLayout.jsx'

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, 
      children: [
        { path: '/', 
          element: <Posts />,
          loader: PostsLoader, 
          children: [
              { path: '/create-post', element: <NewPost />}
      ] },
  ] },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
