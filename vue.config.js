module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Tab Components'
                return args
            })
    },
    publicPath: './'
}