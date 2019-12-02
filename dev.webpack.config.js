const merge = require('webpack-merge');
const base = require('./base.webpack.config.js');

module.exports = merge(base, {
    output: {
        filename: "[name].js"
    },
    mode: 'development',
    devtool: "inline-source-map", //Depurar TypeScript desde chrome, está configuración sólo sirve para desarrollo.
    module: {
        rules: [
            {
                test: /\.css$/, //El fichero de estilos de bootstrap está dentro de node-modules por lo que no podemos excluirlo
                use: ['style-loader', "css-loader"] //En pre-producción podríamos cambiar el mini-css-extract-plugin por el style loader
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', // creates style nodes from JS strings
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
        ],
    },
});