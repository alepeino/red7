module.exports = {
  modules: true,
  plugins: {
    'postcss-modules': {
      globalModulePaths: [
        'src/index.css'
      ]
    },
    'tailwindcss': true,
    'autoprefixer': true
  }
}
