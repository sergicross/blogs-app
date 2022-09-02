


import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render,screen } from '@testing-library/react'
import Blog from './Blog'
import { prettyDom} from '@testing-library/jest-dom'

describe('Blog component', () => {
let blog, user

  beforeEach(() => {
   blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://google.com',
      likes: 10,
      userid: {
        username: "sergiodev",
        name: "Sergio",
        id: "63067b1c70ef842df1ba0040"
    }
  }

   user = {
    username: "sergiodev",
    name: "Sergio",
    token: "asaasas"
  }
  
  })

  test('renders content', () => {
    render (<Blog blog={blog} user={user}></Blog> )

    screen.getByText('Blog title by Blog author')
    const el = screen.getByText('Blog author')
    expect(el.parentNode).toHaveStyle('display: none')
    
    //expect(component.container).toHaveTextContent('Blog title by Blog author')
  })
  
  test('toggled content is shown when button clicked', () => {
    render (<Blog blog={blog} user={user}></Blog> )

    const el = screen.getByText('Blog author')
    expect(el.parentNode).toHaveStyle('display: none')

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()
    
    render (<Blog blog={blog} user={user} />)
    const button = screen.getByText('Like')
    //fireEvent.click(button)
  })
})