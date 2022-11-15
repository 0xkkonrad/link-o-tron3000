module.exports = {
    // all html, css & js content in src/  (e.g. src/main.js)
    content: ['./src/**/*.html', './src/**/*.js', './src/**/*.css', './src/*.css', './src/*.html', './src/*.js'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    }
  },
  variants: {},
  plugins: [
  ]
}
