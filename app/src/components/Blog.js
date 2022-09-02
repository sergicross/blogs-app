import '../index.css'
import { Component, useState } from "react"
import blogService from '../services/blogs'

const Blog = (props) => {
  const [visible , setVisible] = useState(false)
  const [likes, setLikes] = useState(props.blog.likes)
  const showElements = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonName = visible ? 'Hide' : 'View'

  const handleLikes = async () => {
    const newBlog = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: likes +1,
      userid: props.blog.userid.id
    }
    try{
    await blogService.modifyOneBlog(props.blog.id, newBlog)
    setLikes(likes + 1)
    }catch (err){
    }

  }

  const handleRemove = async() => {
    props.deleteOneBlog(props.blog.title, props.blog.author, props.blog.id)
    toggleVisibility()
  }
  

  return (
    <div className="blogstyle">
      <p>{props.blog.title} by {props.blog.author}<button onClick={toggleVisibility}>{buttonName}</button></p>
      <div style={showElements}>
          <p> {props.blog.author}</p>
          <p> {props.blog.url}</p>
          <p> likes: {likes} <button onClick={handleLikes}>Like</button></p>
          <p> {props.blog.userid.name}</p>
          {
            props.blog.userid.username === props.user.username
            ? <p><button onClick={handleRemove}>Remove</button></p>
            : <></>
          }
      </div>
    </div>
  )
}

  
  export default Blog