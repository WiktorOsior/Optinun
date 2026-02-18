import axios from 'axios'

const API_BASE_URL = '/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    });

export const articleService = {
    getAll: () => api.get('/getall'),
    getUnique: () => api.get('/getunique'),
    getCluster : (id : number) => api.get(`/getcluster/${id}`),
    getOrdered : () => api.get(`/getorderedbycluster`),
    getLatest : () => api.get(`/getlatest`),
    getSimilar : (input: string) => api.get('/getsimilaritysearch', {params: {query: input}}),
    getFeed: (page: number) => {return axios.get(`/api/feed?page=${page}`);},
    getHottest:  () => api.get('/gethottest'),
}
export default api;