import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1'
})

// blog api

export const fetchBlogs = () => api.get('/blogs/get');

export const createBlog = (data, token) => api.post('/blogs/create', data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const fetchOneBlog = (id) => api.get(`/blogs/getOne-blog/${id}`);

export const updateBlog = (id, data, token) => api.put(`/blogs/update/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const deleteBlog = (id, token) => api.delete(`/blogs/delete/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// user api

export const signupUser = (data) => api.post('/auth/signup', data);

export const loginUser = (data) => api.post('/auth/login', data);

export const updateUser = (id, data, token) => api.put(`/auth/update/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getOneUser = (id, token) => api.get(`/auth/getOne-user/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});



