import React, {useState ,useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible ] = useState(false)

    const ShowElements = {display : visible ? '' : 'none'}
    const hideElements = {display : visible ? 'none' : ''}
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {toggleVisibility}
    })

    return (
        <div>
          <div style={hideElements}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          </div>
          <div style={ShowElements}>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
          </div>
        </div>
      )
    
})

export default Togglable