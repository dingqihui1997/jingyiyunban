/**
 * husky config
 * @ref https://www.npmjs.com/package/husky
 * @desc 由 @isyscore/cli@1.30.0 于 2021-11-01 17:52:55 自动生成
 */

module.exports = {
    'hooks': {
        'pre-commit': 'lint-staged --allow-empty',
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
    }
}
