const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (content) => {
  return content.reduce((accumulator, current) => accumulator + current.likes, 0)
}

const favoriteBlog = (content) => {
  if (!content || content.lenght === 0) {
    return null
  }
  return content.reduce((highestLikes, current) => {
    if(current.likes > (highestLikes.likes || -Infinity)) {
      return current
    } else {
      return highestLikes
    }
  })
}

const mostBlogs = (content) => {
  let groupByAuthor = _.groupBy(content, 'author')
  const authorWithMostBlogs = Object.entries(groupByAuthor).reduce((mostBlogs, [key, value]) => {
    if(value.length > mostBlogs.value || -Infinity) {
      return [key, value]
    } else {
      return mostBlogs
    }
  })
  const retVal = {author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1].length }
  return(retVal)
}

const mostLikes = (content) => {
  let groupByAuthor = _.groupBy(content, 'author')
  const authorWithMostLikes = Object.entries(groupByAuthor).reduce((mostLikes, [key, value]) => {
    let locTestLikes = value.reduce((acc, item) => acc + item.likes, 0)
    let locMostLikes = 0
    if(mostLikes) {
      locMostLikes = mostLikes[1].reduce((acc, item) => acc + item.likes, 0)
    }

    if(locTestLikes > locMostLikes) {
      return [key, value]
    } else {
      return mostLikes
    }
  })
  const retVal = {author: authorWithMostLikes[0], likes: authorWithMostLikes[1].reduce((acc, item) => acc + item.likes, 0)}
  return retVal
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}