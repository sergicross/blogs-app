const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blogs')
test('dummy always return 1', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty the result is zero', () => {
    const blogempty = []
    const result = listHelper.totalLikes(blogempty)
    expect(result).toBe(0)
  })
  test('when list has only one blogs, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      }
    ]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('favourite blog', () => {
    const expectresult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(expectresult)
  })
})

describe('Autor more blogs', () => {
  test('Autor more blogs', () => {
    const expectresult = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expectresult)
  })
})

describe('Blog and actor more likes', () => {
  test('Blog more likes', () => {
    const expectresult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(expectresult)
  })
})
