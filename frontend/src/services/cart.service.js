import createApiClient from './api.service';
class CartService {
    constructor(baseUrl = '/carts') {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/')).data;
    }

    async create(cartId, data) {
        return (await this.api.post(`/${cartId}`, data)).data;
    }

    async deleteAll() {
        return (await this.api.delete('/')).data;
    }

    async get(cartId) {
        return (await this.api.get(`/${cartId}`)).data;
    }

    async quantity(cartId) {
        return (await this.api.get(`/${cartId}/quantity`)).data;
    }

    async update(cartId, data) {
        return (await this.api.put(`/${cartId}`, data)).data;
    }

    async deleteOne(cartId, detailId) {
        return (await this.api.delete(`/${cartId}`, { params: { detailId } }))
            .data;
    }
}
export default new CartService();
