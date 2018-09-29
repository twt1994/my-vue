'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://106.12.124.177:7002"',
  					/*http://139.196.98.45:7002*/
  	/*https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin*/
})
