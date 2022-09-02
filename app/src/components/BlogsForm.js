import { useState, useRef } from "react"
import Notification from "./Notification"
import Blog from "./Blog"
import Togglable from "./Togglable"


const BlogsForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  const handleCreateOneBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    props.createOneBlog(blogObject)
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }
    
    return(
      <div>
        <div>
          <h2> App blogs</h2>
          <p> {props.user.name} logged in <button onClick={props.handleLogOut}>logout</button></p>
          <Notification error={props.error} verify={props.verify}/>
        </div>
        <div>
          <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
          <form onSubmit={handleCreateOneBlog}>
            <h2> create new blog </h2>
            <p>title: <input type='text' name='title' placeholder='title' value={title} onChange={(event) => {setTitle(event.target.value)}}/></p>
            <p>author: <input type='text' name='author' placeholder='author' value={author} onChange={(event) => {setAuthor(event.target.value)}}/></p>
            <p>url: <input type='text' name='url' placeholder='url' value={url} onChange={(event) => {setUrl(event.target.value)}}/></p>
            <button> create </button>
          </form>
          </Togglable>
        </div>
        <div>
        <h2>blogs</h2>
        {props.blogs
        .sort((a,b) =>{
          return a.likes - b.likes
        }).reverse()
        .map(blog =>
        <Blog key={blog.id} blog={blog} user={props.user} deleteOneBlog={props.deleteOneBlog}/>
      )}
        </div>
    </div>
    )
  }

  export default BlogsForm