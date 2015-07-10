module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loaders: ['babel-loader']
            }, {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loaders: ['babel-loader']
            }
        ]
    }
};
