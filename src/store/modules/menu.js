/**
 * @type { import('vuex').Module }
 */
import { SET_MENU_LIST } from '../types';

export const menuModule = {
    state: {
        menu: []
    },
    getters: {},
    mutations: {
        [SET_MENU_LIST](state, menuList) {
            state.menu = menuList;
        }
    }
};
