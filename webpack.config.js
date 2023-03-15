import path from 'path'

import { VueLoaderPlugin } from 'vue-loader'

import {
  CLIENT_ENTRY_NAME,
  COMPONENT_ENTRY_NAME,
  OUTPUT_FILE_NAME
} from './config.js'

export default {
  mode: 'development',
  experiments: {
    outputModule: true
  },
  entry: {
    [CLIENT_ENTRY_NAME]: ['Vue', '/src/client.js'],
    [COMPONENT_ENTRY_NAME]: '/src/view/Component.vue'
  },
  output: {
    path: path.join(path.resolve(), OUTPUT_FILE_NAME),
    filename: '[name].js',
    libraryTarget: 'module'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  externals: {
    vue: 'vue'
  },
  plugins: [new VueLoaderPlugin()]
}
