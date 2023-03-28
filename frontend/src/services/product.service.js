import createApiClient from './api.service';
class ProductService {
    constructor(baseUrl = '/products') {
        this.api = createApiClient(baseUrl);
    }

    async getAll(skip = 0, limit = 0) {
        return (await this.api.get('/', { params: { skip, limit } })).data;
    }

    async create(data) {
        return (await this.api.post('/', data)).data;
    }

    async deleteAll() {
        return (await this.api.delete('/')).data;
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

    async search(query) {
        return (await this.api.get(`/search`, { params: query })).data;
    }

    async filter(filter) {
        const params = filter;
        return (await this.api.get(`/filter`, { params })).data;
    }
}
export default new ProductService();
