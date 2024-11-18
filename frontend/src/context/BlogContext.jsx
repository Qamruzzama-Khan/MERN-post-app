import { createContext, useMemo, useReducer, useEffect } from 'react';
import { fetchBlogs } from '../services/api';

// Define the initial state
const initialState = {
    blogs: []
};

export const BlogContext = createContext();

export const BlogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return { ...state, blogs: action.payload };
        case 'ADD_BLOG':
            return { ...state, blogs: [action.payload, ...state.blogs] }
        case 'REMOVE_BLOG':
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload.id)
            }
        case 'UPDATE_BLOG': 
        return {
            ...state, 
            blogs: state.blogs.map(blog => blog._id === action.payload.id ? action.payload.data : blog)
        }    
        default:
            return state;
    }
}

// Create the BlogContextProvider component
export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BlogReducer, initialState)

    const value = useMemo(() => ({ ...state, dispatch }), [state]);

    useEffect(() => {
        const getAllBlogs = async () => {
          const response = await fetchBlogs();
          // setBlogs(response.data.data)
          dispatch({type: 'SET_BLOGS', payload: response.data.data})
        }
        getAllBlogs();
      }, [])

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}




