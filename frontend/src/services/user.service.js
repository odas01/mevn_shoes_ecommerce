import createApiClient from './api.service';
class UserService {
    constructor(baseUrl = '/users') {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get(`/`)).data;
    }

    async regis(data) {
        return await this.api.post('/signup', data);
    }

    async login(data, role = 'user') {
        return await this.api.post('/signin', data, { headers: { role } });
    }

    async get(token) {
        return (
            await this.api.get(`/secret`, { headers: { authoriztion: token } })
        ).data;
    }

    async checkAdmin(token) {
        return (
            await this.api.get(`/checkAdmin`, {
                headers: { authoriztion: token },
            })
        ).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async changePassword(token, data) {
        return (
            await this.api.put(
                `/changePw`,
                { params: { data } },
                {
                    headers: { authoriztion: token },
                }
            )
        ).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async search(data) {
        return (await this.api.get(`/search`, { params: { data } })).data;
    }
}
export default new UserService();
