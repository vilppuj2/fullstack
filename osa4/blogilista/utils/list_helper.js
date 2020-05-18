const _ = require('lodash')

const dummy = (blogs) => {
  void(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return item.likes > favorite.likes
      ? item
      : favorite
  }
  if (blogs.length === 0) return blogs
  const favorite = blogs.reduce(reducer, blogs[0])
  delete favorite._id
  delete favorite.url
  delete favorite.__v
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return blogs

  const most = _(blogs)
    .groupBy('author')
    .mapValues(b => b.length)
    .toPairs()
    .maxBy(p => p[1])

  const result = {
    author: most[0],
    blogs: most[1]
  }
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return blogs

  const most = _(blogs)
    .groupBy('author')
    .mapValues(b => _.sumBy(b, o => o.likes))
    .toPairs()
    .maxBy(p => p[1])

  const result = {
    author: most[0],
    likes: most[1]
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}