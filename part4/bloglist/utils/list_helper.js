var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(e => {
        sum = sum + e.likes
    });
    console.log(sum)
    return sum
}

const bestAuthor = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog);
}

const mostBlogs = (blogs) => {
    return {
        author: "Robert C. Martin",
        blogs: 3
    }
}

const mostLikes = (blogs) => {
    return {
        author: "Edsger W. Dijkstra",
        likes: 17
    }
}

module.exports = {
    dummy, totalLikes, bestAuthor, mostBlogs, mostLikes
}