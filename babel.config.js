module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        ['import', { libraryName: '@isyscore/mobile-ui', libraryDirectory: 'es', style: true }, '@isyscore/mobile-ui']
    ]
};
