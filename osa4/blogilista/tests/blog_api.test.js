const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const savedBlogs = await Blog.insertMany(helper.initialBlogs)
    await savedBlogs.forEach(async blog => {
      const updatedBlog = {
        user: savedUser.id
      }
      const savedBlog = await Blog.findByIdAndUpdate(blog.id, updatedBlog)
      user.blogs = user.blogs.concat(savedBlog._id)
    })
    await user.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have identifying field called id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)

    expect(ids[0]).toBeDefined()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }

    const login = {
      username: 'root',
      password: 'sekret'
    }
    const t = await api
      .post('/api/login')
      .send(login)
    const token = `bearer ${t.body.token}`

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'React patterns'
    )
  })

  test('likes is set to 0 when the amount is not given', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
    }

    const login = {
      username: 'root',
      password: 'sekret'
    }
    const t = await api
      .post('/api/login')
      .send(login)
    const token = `bearer ${t.body.token}`

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd[helper.initialBlogs.length].likes
    expect(likes).toBe(0)
  })

  test('blog without title and url produces 400 Bad request', async () => {
    const newBlog = {
      author: 'Michael Chan',
      likes: 7
    }

    const login = {
      username: 'root',
      password: 'sekret'
    }
    const t = await api
      .post('/api/login')
      .send(login)
    const token = `bearer ${t.body.token}`

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('deleting a blog succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const login = {
      username: 'root',
      password: 'sekret'
    }
    const t = await api
      .post('/api/login')
      .send(login)
    const token = `bearer ${t.body.token}`

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('updating the likes of a blog succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const updatedLikes = blogsAtEnd[0].likes
    expect(updatedLikes).toBe(blogToUpdate.likes + 1)
  })

  test('adding a blog without token produces status code 401', async () => {
    const newBlog = {
      title: 'Wont be added',
      author: 'Not today',
      url: 'https://nope.com/',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})