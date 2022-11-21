import http from "@/plugins/axios";

export default{
    getAll: () =>{
        return http.get('/rents');
    }, 
    getById: (id) =>{
        return http.get(`/rents/${id}`);
    },
    post: (rental) =>{
        return http.post('/rents', rental);
    },
    devolution: (id, rental) => {
        return http.put(`/rents/devolution/${id}`, rental);
    },
    delete: (id) =>{
        return http.delete(`/rents/${id}`)
    }
}