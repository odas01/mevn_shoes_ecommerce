import createApiClient from './api.service';
class CategoryService {
    constructor(baseUrl = '/categorys') {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/')).data;
    }

    async create(data) {
        return (await this.api.post('/', data)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async search(name) {
        return (await this.api.get(`/search`, { params: { name } })).data;
    }
    async filter(type) {
        return (await this.api.get(`/filter`, { params: { type: type } })).data;
    }
}
export default new CategoryService();
