
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  DELETE_POST,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST,
  ADD_POST,
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
    case CREATE_POST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case CREATE_POST_SUCCESS:
      return { ...state, loading: false, posts: [...state.posts, action.payload] };
    case FETCH_POSTS_FAIL:
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((_, index) => index !== action.payload),
      };
    case EDIT_POST:
      const updatedPosts = [...state.posts];
      updatedPosts[action.payload.index] = action.payload.post;
      return {
        ...state,
        posts: updatedPosts,
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
