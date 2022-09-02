///<reference types="cypress" />

describe('Note App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.request('DELETE', 'http://localhost:3005/api/testing/reset')

        const user = {
            username: "sergiodev",
            name: "Sergio",
            password: "password123"
        }

        cy.request('POST' , 'http://localhost:3005/api/users', user)
        
    })
    it('login form is shown', () => {
        cy.contains('Username')
        cy.contains('Password')
    })
    describe('Login', () => {
      it('succeeds with correct credentials', () =>{
        cy.get('[name="username"]').type('sergiodev')
        cy.get('[name="password"]').type('password123')
        cy.get('button').contains('Log in').click()
        cy.contains('App blogs')
      })
      it('fails with incorrect credentials', () =>{
        cy.get('[name="username"]').type('sergdev')
        cy.get('[name="password"]').type('password123')
        cy.get('button').contains('Log in').click()
        cy.get('.error')
        .should('contain', 'Username or password invalid')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
    describe('When log in' , () => {
      beforeEach(()=>{
        
        cy.login({username: 'sergiodev', password:'password123'})
        cy.CreateBlog({
          title: 'aaaaaaaaaaaaaaaaaaaa',
          author: 'Juan',
          url: 'www.pruebaañadir.com'
        })
    })
    it('the button create blog open form', () => {
      cy.contains('title').should('not.exist')
      cy.contains('Create Blog').click()
      cy.contains('title')
    })
    it('the button cancel close form', () => {
      cy.contains('Create Blog').click()
      cy.contains('title')
      cy.contains('cancel').click()
      cy.contains('Create Blog')
    })
    it('the blog can be created',() =>{
      cy.contains('Create Blog').click()
      cy.get('[name="title"]').type('Blog creado desde cypress')
      cy.get('[name="author"]').type('Sergio')
      cy.get('[name="url"]').type('www.prueba.com')
      cy.get('button').contains('create').click()

      cy.contains('Blog creado desde cypress')
    })
    it('user can give like' , () => {
      cy.contains('View').click()
      cy.contains('likes: 0')
      cy.contains('Like').click()
      cy.contains('likes: 1')

    })
  })

})