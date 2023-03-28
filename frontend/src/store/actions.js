import UserService from '@/services/user.service';
import CartService from '@/services/cart.service';
import ProductService from '@/services/product.service';
export default {
    async login({ commit }, data) {
        const { role } = data;
        delete data.role;
        try {
            const response = await UserService.login(data, role);
            console.log(response);
            commit('SAVE_TOKEN', { token: response.headers.authoriztion });
            return { status: true };
        } catch (e) {
            console.error(e.response.data.error.message);
            return { status: false, message: e.response.data.error.message };
        }
    },
    logout({ commit }) {
        commit('REMOVE_TOKEN');
    },
    async changePassword({ commit }, data) {
        try {
            await UserService.changePassword(
                data.token,
                data.data
            );
            return { status: true };
        } catch (e) {
            console.error(e.response.data.error.message);
            return { status: false, message: e.response.data.error.message };
        }
    },
    async regis({ commit }, data) {
        try {
            await UserService.regis(data);
            return { status: true };
        } catch (e) {
            console.error(e.response.data.error.message);
            return { status: false, message: e.response.data.error.message };
        }
    },
    async getUser({ commit }, token) {
        try {
            const response = await UserService.get(token);
            commit('SET_USER', response);
        } catch (e) {
            commit('SET_USER', {});
        }
    },
    async getCart({ commit }, token) {
        try {
            const response = await UserService.get(token);
            commit('SET_USER', response.user);
        } catch (e) {
            commit('SET_USER', {});
        }
    },
    async cartQuantity({ commit, state }) {
        try {
            const response = await CartService.quantity(state.user.cartId);
            commit('SET_QUANTITY', response.quantity);
        } catch (e) {
            commit('SET_QUANTITY', 0);
        }
    },
    search({ commit }, value) {
        try {
            return ProductService.search({
                name: value,
                open: true,
            });
        } catch (e) {
            console.log(e);
        }
    },
};
