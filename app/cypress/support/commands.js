Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', 'http://localhost:3005/api/login',{
        username: username,
        password: password
    }).then((response) => {
        localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(response.body)
        )
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('CreateBlog', ({title, author, url}) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3005/api/blogs',
        body: {
            title: title,
            author: author,
            url: url
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})