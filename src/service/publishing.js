import http from "@/plugins/axios";

export default{
    getAll: () =>{
        return http.get('/publishing');
    }, 
    getById: (id) =>{
        return http.get(`/publishing/${id}`);
    },
    post: (publishing) =>{
        return http.post('/publishing', publishing);
    },
    put: (id, publishing) =>{
        return http.put(`/publishing/${id}`, publishing)
    },
    delete: (id) =>{
        return http.delete(`/publishing/${id}`)
    }
}