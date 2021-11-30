/**
 * lint-staged config
 * @ref https://www.npmjs.com/package/lint-staged
 * @desc 由 @isyscore/cli@1.30.0 于 2021-11-01 17:52:55 自动生成
 */

module.exports = {
    "*.{[tj]s,[tj]sx,[cm]js}": [
        'eslint --fix'
    ],

    
    '*.vue': [
        'eslint --fix',
        'stylelint --fix --allow-empty-input'
    ],

    '*.s?css': [
        'stylelint --fix --allow-empty-input'
    ],
    

    '*.json': [
        'prettier --write'
    ]
};
