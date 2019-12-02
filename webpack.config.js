const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
        app: ["regenerator-runtime/runtime", "./students.tsx"],
        appStyles: ["./mystyle.scss"],
        vendorStyles: ["../node_modules/bootstrap/dist/css/bootstrap.css"]
    },
    output: {
        filename: "[name].[chunkhash].js"
    },
    devtool: "inline-source-map", //Depurar TypeScript desde chrome, está configuración sólo sirve para desarrollo.
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
                test: /\.jsx?$/, //Si la extensión es .js o .jsx usa babel-loader
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
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            },
                            localsConvention: 'camelCase', //permite usar los estilos con camel case en vez de usando el nombre original de la regla de css
                        }
                    },
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
            },
            {
                test: /\.html$/,
                loader: "html-loader" //Permite usar imagenes directamente en el html sacándolas.
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
                options: {
                    useBabel: true, //Indica que del final de la transpilación que no hace Typescript (de ES6 a ES5) se encargue babel
                    babelCore: "@babel/core" // needed for Babel v7
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ //Pega el index.html a dist y le inyecta solo al html el bundle.js
            filename: "index.html", // este el nombre que va a la carpeta dist
            template: "index.html", // fichero origen
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css", //Le añadimos el hash para evitar que se cacheen los estilos
            chunkFilename: "[id].css"
        })
    ]
};