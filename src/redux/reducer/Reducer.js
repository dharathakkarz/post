




import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  DELETE_POST,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST,
 
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USER_ALBUMS_REQUEST,
  FETCH_USER_ALBUMS_SUCCESS,
  FETCH_USER_ALBUMS_FAILURE,
  FETCH_USER_TODOS_REQUEST,
  FETCH_USER_TODOS_SUCCESS,
  FETCH_USER_TODOS_FAILURE
} from '../../constant/ActionType';

const initialState = {
  loading: false,
  error: null,
  users: [],
  posts: [],
  albums: [],
  todos: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POSTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ''
      };
    case FETCH_POSTS_FAIL:
      return {
        loading: false,
        posts: [],
        error: action.payload
      };

    case CREATE_POST:
      const newPost = {
        id: state.posts.length + 1, // id for post
        title: action.payload.title,
        content: action.payload.content,
      };
      return { ...state, posts: [...state.posts, newPost] };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id),
      };
      case EDIT_POST:
        return {
          ...state,
          posts: state.posts.map(post =>
            post.id === action.payload.id ? { ...post, title: action.payload.title, content: action.payload.content } : post
          ),
        };

    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, users: [], error: action.payload };
    case FETCH_USER_ALBUMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_ALBUMS_SUCCESS:
      return { ...state, loading: false, albums: action.payload, error: null };
    case FETCH_USER_ALBUMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_USER_TODOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload, error: null };
    case FETCH_USER_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
