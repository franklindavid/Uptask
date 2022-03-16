const path = require('path');
const webpack = require ('webpack');

module.exports={
    entry: './public/js/app.js',
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname,'./public/dist')
    },
    watch:true,//en la version 5 toca poner el watch aca
    module:{
        rules: [
            {
                test: /\.m?js$/,
                // exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
            }
        ]
    }
}