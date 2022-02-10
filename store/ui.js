
export const state = () => ({
    nuxtLoader:false,

});
export const mutations = {
    SHOW_LOADER (state) {
        state.nuxtLoader = true;
    },
    HIDE_LOADER (state) {
        state.nuxtLoader = false;
    }
};

export const getters = {
    nuxtLoader: state => state.nuxtLoader
};