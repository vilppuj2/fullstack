const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const multipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list should not exist', () => {
    expect(listHelper.favoriteBlog(emptyList)).toEqual([])
  })

  test('when list has only one blog should be that one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const actual = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(actual)
  })

  test('of a bigger list is selected right', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    const actual = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(actual)
  })
})

describe('author with most blogs', () => {
  test('of empty list should not exist', () => {
    expect(listHelper.mostBlogs(emptyList)).toEqual([])
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const actual = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(actual)
  })

  test('of a bigger list is selected right', () => {
    const result = listHelper.mostBlogs(multipleBlogs)
    const actual = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(actual)
  })
})

describe('author with most likes', () => {
  test('of empty list should not exist', () => {
    expect(listHelper.mostLikes(emptyList)).toEqual([])
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const actual = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(actual)
  })

  test('of a bigger list is selected right', () => {
    const result = listHelper.mostLikes(multipleBlogs)
    const actual = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(actual)
  })
})