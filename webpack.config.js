// webpack.config.js
const path = require('path');
module.exports = function (modeName) {
    return ({
        // entry: {
        //     app: './src/assets/js/script.js',
        // },
        // entry: {
        //     app: './app.js',
        // },
        output: {
            filename: 'script.min.js',
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        watch: false,
        mode: modeName,
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                          ['latest', { modules: false }],
                        ],
                      },
                },
            ],
        },
        
        stats: 'errors-only'
    })
}