import blogService from "../services/blogs";
import commentService from "../services/comments";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.payload.blogs;
    case "CREATE_BLOG":
      return state.concat(action.payload.newBlog);
    case "LIKE_BLOG":
      return [
        ...state.filter(blog => blog.id !== action.payload.updatedBlog.id),
        action.payload.updatedBlog
      ];
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.payload.id);
    case "ADD_COMMENT":
      debugger;
      const newState = [...state];
      const blog = newState.find(blog => blog.id === action.payload.blog);
      blog.comments.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();

    dispatch({
      type: "INIT_BLOGS",
      payload: {
        blogs
      }
    });
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog);

    dispatch({
      type: "CREATE_BLOG",
      payload: {
        newBlog
      }
    });
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog({
      ...blog,
      likes: blog.likes + 1
    });

    dispatch({
      type: "LIKE_BLOG",
      payload: {
        updatedBlog
      }
    });
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id);
    dispatch({
      type: "DELETE_BLOG",
      payload: {
        id: blog.id
      }
    });
  };
};

export const addComment = (blogId, text) => {
  return async dispatch => {
    const comment = await commentService.createCommentTo(blogId, text);
    dispatch({
      type: "ADD_COMMENT",
      payload: {
        ...comment
      }
    });
  };
};

export default reducer;
