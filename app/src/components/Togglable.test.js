/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, configure } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    component = render(
      <Togglable buttonLabel="show...">
        <div>testDivContent</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.getByText('testDivContent')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const el =  component.getByText('testDivContent')

    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)
    const el =  component.getByText('testDivContent')

    expect(el.parentNode).not.toHaveStyle('display: none')
  })

})