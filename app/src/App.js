
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [verify, setVerify] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const UserCookie = window.localStorage.getItem('loggedBlogappUser')
    if (UserCookie){
      const user = JSON.parse(UserCookie)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (credentials) => {
    try{
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    setUser(user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (err) {
      setError('Username or password invalid')
      setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createOneBlog = async (blogObject) => {

    try{
    const newBlog = await blogService.createOneBlog(blogObject)
    setVerify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setBlogs(blogs.concat(newBlog))
    setTimeout(() => {
      setVerify(null)
    }, 1000)
    } catch (err){
      setError('the blog not added')
      setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }

  const deleteOneBlog = async(title, author, id) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try{
        await blogService.deleteOneBlog(id)
        setBlogs(blogs.filter((blog) => blog.title !== title))
        setVerify(`The blog ${title} have been delete`)
      }catch(err){
        setError(`the blog ${title} not remove`)
      }
    }
    
  }
  return (
    <div>
      {
        user === null
        ? <LoginForm login={login} error={error} verify={verify}/>
        : <BlogsForm handleLogOut={handleLogOut} createOneBlog={createOneBlog} deleteOneBlog={deleteOneBlog} user={user} blogs={blogs} error={error} verify={verify}/>
      }
    </div>
  )
}

export default App;
