/**
 * eslint config
 * @ref http://eslint.cn/
 * @desc 由 @isyscore/cli@1.30.0 于 2021-11-01 17:51:18 自动生成
 */

module.exports = {
    root: true,

    env: {
        node: true,
        browser: true,
        es6: true
    },

    globals: {
        // base
        ENVS: true
    },

    extends: [
        // base
        '@isyscore/eslint-config-isyscore',

        // vue
        '@isyscore/eslint-config-isyscore/vue'
    ]
};
