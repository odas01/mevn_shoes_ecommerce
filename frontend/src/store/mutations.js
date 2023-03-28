export default {
    SET_USER(state, payload) {
        state.user = payload;
        localStorage.setItem('cartId', payload.cartId);
    },
    SAVE_TOKEN(state, payload) {
        localStorage.setItem('token_user', payload.token);
    },
    REMOVE_TOKEN() {
        localStorage.removeItem('token_user');
        localStorage.removeItem('cartId');
    },
    REDUCE_QUANTITY(state) {
        state.quantityCart--;
    },
    SET_QUANTITY(state, payload) {
        state.quantityCart = payload;
    },
    SET_FILTER(state, payload) {
        state.filter = payload;
        if (state.filter.category === 'all') delete state.filter.category;
    },
};
