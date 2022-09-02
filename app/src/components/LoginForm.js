
import Notification from "./Notification"
import { useState } from "react"


const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmitLogin = (event) => {
        event.preventDefault()
        props.login({username: username, password: password})
        setUsername('')
        setPassword('')
    }
    return (
      <div>
        <h2> Log in to application</h2>
        <Notification error={props.error} verify={props.verify}/>
        <form onSubmit={handleOnSubmitLogin}>
          <p>Username <input 
          name='username'
          type='text' 
          placeholder='username' 
          value={username} 
          onChange={(event) => {setUsername(event.target.value)}}/>
          </p>
          <p>Password <input 
          name='password'
          type='password' 
          placeholder='password' 
          value={password} 
          onChange={(event) => {setPassword(event.target.value)}}/>
          </p>
          <button> Log in </button>
        </form>
      </div>
    )
  }

  export default LoginForm