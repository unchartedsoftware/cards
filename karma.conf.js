/*
 * Copyright 2018 Uncharted Software Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const isTddMode = process.argv.indexOf("--tdd") > -1;
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');

process.env.CHROME_BIN = process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD ?
    '/usr/bin/chromium-browser' : require('puppeteer').executablePath();

console.log(process.env.CHROME_BIN);

module.exports = function (config) {
    config.set({
        basePath: '',
        browsers: isTddMode ? ['Chrome'] : ['ChromeHeadless'],
        frameworks: ['mocha', 'sinon-chai'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'src/**/*.spec.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'src/**/*.spec.js': ['webpack', 'sourcemap'],
        },
        webpackMiddleware: {
            stats: 'errors-only',
        },
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.handlebars$/,
                        loader: 'handlebars-loader',
                        query: {
                            helperDirs: [
                                path.resolve(__dirname, 'src/handlebarHelper'),
                            ],
                        },
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['latest', { es2015: { modules: false } }],
                            ],
                        },
                        exclude: /node_modules/,
                    },
                ],
            },
            resolve: webpackConfig.resolve,
            externals: [
                {
                    sinon: "sinon",
                    chai: "chai",
                },
            ],
            plugins: [
                new webpack.SourceMapDevToolPlugin({
                    filename: null, // if no value is provided the sourcemap is inlined
                    test: /\.(js)($|\?)/i, // process .js files only
                }),
            ],
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: !isTddMode,
        concurrency: Infinity,
        failOnEmptyTestSuite: false,
    });
};
