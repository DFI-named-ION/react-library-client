import axios from 'axios'

const BASE_URL = 'https://localhost:44355/api/';

export const ENDPOINTS = {
    books: 'Books',
    orders: 'Orders',
    orderItems: 'OrderItems',
};

export const createAPIEndPoint = (endpoint) => {
    let url = BASE_URL + endpoint + '/';
    return {
        fetchAll: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        create: (newItem) => axios.post(url, newItem),
        update: (id, editItem) => axios.put(url + id, editItem),
        delete: (id) => axios.delete(url + id)
    };
}