import createApiClient from './api.service';
class OrderService {
    constructor(baseUrl = '/orders') {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/')).data;
    }

    async create(userId, data) {
        return (await this.api.post(`/${userId}`, data)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async search(phone) {
        return (await this.api.get(`/search`, { params: { phone } })).data;
    }
}
export default new OrderService();
