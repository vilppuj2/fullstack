describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Juuso Vilppula',
      username: 'jvilppula',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jvilppula')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Juuso Vilppula logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jvilppula')
      cy.get('#password').type('wrongpw')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jvilppula', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('blog.cypress')
      cy.contains('create').click()
      cy.contains('a blog created by cypress cypress')
    })

    describe('and multiple blogs are added', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'cypress', url: 'first.blog', likes: 0 })
        cy.createBlog({ title: 'second blog', author: 'cypress', url: 'second.blog', likes: 10 })
        cy.createBlog({ title: 'third blog', author: 'cypress', url: 'third.blog', likes: 2 })
      })

      it('A blog can be liked', function() {
        cy.contains('first blog cypress').parent().as('blogParent')
        cy.get('@blogParent').find('#view-button').click()
        cy.get('@blogParent').find('#like-button').click()
        cy.contains('likes 1')
      })

      it('A blog can be removed by its creator', function() {
        cy.contains('first blog cypress').parent().as('blogParent')
        cy.get('@blogParent').find('#view-button').click()
        cy.get('@blogParent').find('#remove-button').click()
        cy.get('html').should('not.contain', 'first blog cypress')
      })

      it('Blogs are sorted by their likes', function() {
        cy.get('[id="blog"]').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'second blog cypress')
          cy.wrap(blogs[1]).should('contain', 'third blog cypress')
          cy.wrap(blogs[2]).should('contain', 'first blog cypress')
        })
      })
    })
  })
})