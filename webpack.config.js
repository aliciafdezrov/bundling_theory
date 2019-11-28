const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"),
    entry: {
        app: ["regenerator-runtime/runtime", "./students.js"],
        appStyles: "./mystyle.scss",
        vendorStyles: ["../node_modules/bootstrap/dist/css/bootstrap.css"]
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
                use: [MiniCssExtractPlugin.loader, "css-loader"] //En pre-producción podríamos cambiar el mini-css-extract-plugin por el style loader
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, // creates style nodes from JS strings //En desarrollo este se puede cambiar por styles-loader
                    "css-loader", // translates CSS into CommonJS
                    {
                        loader: "sass-loader", //translates SCSS into CSS
                        options: {
                            implementation: require("sass") //By default the sass-loader prefers node-sass. In order to avoid this situation you can use the implementation option
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                //loader: "file-loader"
                loader: "url-loader?limit=5000" //Me embebe la imagen dentro de mi app.js si ocupa menos de 5Kb
            }
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