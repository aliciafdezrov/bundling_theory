const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: ["regenerator-runtime/runtime", "./students.js"],
        appStyles: "./mystyle.css",
        vendorStyles: ["./node_modules/bootstrap/dist/css/bootstrap.css"]
    },
    output: {
        filename: "[name].[chunkhash].js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: { //Vamos a especificar que chunks va a haber
                vendor: { //Teniendo esta linea no es necesaria la etiqueta vendor de entry
                    chunks: 'all', //Mete todos los plugins/librerias que se usen dentro de mi aplicación
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/, //No incluyas los que hay en node modules.
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/, //El fichero de estilos de bootstrap está dentro de node-modules por lo que no podemos excluirlo
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ //Pega el index.html a dist y le inyecta solo al html el bundle.js
            filename: "index.html", // este el nombre que va a la carpeta dist
            template: "index.html", // fichero origen
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css", //Le añadimos el hash para evitar que se cacheen los estilos
            chunkFilename: "[id].css"
        })
    ]
};