const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    const arraylikes = blogs.map((blog) => {
      return blog.likes
    })
    const likes = arraylikes.reduce((acc, curr) => {
      return acc + curr
    })
    return likes
  }
}

const favoriteBlog = (blogs) => {
  const arraylikes = blogs.map((blog) => {
    return blog.likes
  })
  const maxlikes = Math.max(...arraylikes)
  const blog = blogs.find((blog) => blog.likes === maxlikes)
  return blog
}

const mostBlogs = (blogs) => {
  const group = blogs.reduce((r, a) => {
    r[a.author] = [...r[a.author] || [], a]
    return r
  }, {})

  const mostBlogsAuthorObject = group[Object.keys(group).reduce(
    (acc, blog) => acc = acc.childElementCount > blog.childElementCount ? acc : blog, 0
  )]

  return {
    author: mostBlogsAuthorObject[0].author,
    blogs: mostBlogsAuthorObject.length
  }
}

const mostLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.likes

  const group = blogs.reduce((r, a) => {
    r[a.author] = [...r[a.author] || [], a]
    return r
  }, {})

  let largest = 0
  let mostLikedAuthor = ''
  Object.keys(group).forEach(key => {
    if (largest < group[key].reduce(reducer, 0)) {
      largest = group[key].reduce(reducer, 0)
      mostLikedAuthor = key
    }
  })
  return {
    author: mostLikedAuthor,
    likes: largest
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
