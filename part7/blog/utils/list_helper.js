const _ = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0);
};

const favoriteBlog = blogs => {
  blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return 1;
    }
    return -1;
  });

  return blogs[0];
};

const mostBlogs = blogs => {
  const groupedByAuthor = _.groupBy(blogs, blog => {
    return blog.author;
  });

  const mostBlogs = {};
  for (const [author, blogs] of Object.entries(groupedByAuthor)) {
    if (!mostBlogs.likes || blogs.length > mostBlogs.blogs) {
      mostBlogs.author = author;
      mostBlogs.blogs = blogs.length;
    }
  }

  return mostBlogs;
};

const mostLikes = blogs => {
  const groupedByAuthor = _.groupBy(blogs, blog => {
    return blog.author;
  });

  const mostLikes = {};
  for (const [author, blogs] of Object.entries(groupedByAuthor)) {
    const numberOfLikes = totalLikes(blogs);

    if (!mostLikes.likes || numberOfLikes > mostLikes.likes) {
      mostLikes.author = author;
      mostLikes.likes = numberOfLikes;
    }
  }

  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
