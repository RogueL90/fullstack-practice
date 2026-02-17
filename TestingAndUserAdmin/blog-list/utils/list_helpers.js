const dummy = (arr) => {
    return 1
} 

const totalLikes = (arr) => {
    return arr.reduce((sum, blog) => sum+blog.likes, 0)
}

// Extras
const favoriteBlog = (arr) => {
    let max = -1
    let popular = null
    for(const blog of arr){
        if(blog.likes>max){
            max = blog.likes
            popular = blog
        }
    }
    return popular
}

const mostBlogs = (arr) => {
    const map = new Map()
    for(const blog of arr){
        if(map.has(blog.author)){
            map.set(blog.author, map.get(blog.author)+1)
        }else{
            map.set(blog.author, 1)
        }
    }
    let max = 0;
    let mostAuthor = ""
    for(const [author, posts] of map){
        if(posts>max){
            mostAuthor = author
            max = posts
        }
    }
    return mostAuthor
}

const mostLikes = (arr) => {
const map = new Map()
for(const blog of arr){
    if(map.has(blog.author)){
        map.set(blog.author, map.get(blog.author)+blog.likes)
    }else {
        map.set(blog.author, blog.likes)
    }
}
let popAuthor = ""
let maxLikes = 0
for(const [author, likes] of map){
    if(likes > maxLikes){
        popAuthor = author
        maxLikes = likes
    }
}
return {author: popAuthor, likes: maxLikes}
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}