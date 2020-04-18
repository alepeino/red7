module.exports = {
  modules: true,
  plugins: {
    'postcss-modules': {
      globalModulePaths: [
        'src/index.scss'
      ]
    },
    'tailwindcss': true,
    'autoprefixer': true
  }
}
