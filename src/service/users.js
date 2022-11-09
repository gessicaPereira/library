import http from "@/plugins/axios";

export default{
    getAll: () =>{
        return http.get('/users');
    }, 
    getById: (id) =>{
        return http.get(`/users/${id}`);
    },
    post: (user) =>{
        return http.post('/users', user);
    },
    put: (id, user) =>{
        return http.put(`/users/${id}`, user)
    },
    delete: (id) =>{
        return http.delete(`/users/${id}`)
    }
}