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
        })
    ]
};