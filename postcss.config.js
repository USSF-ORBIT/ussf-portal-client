// This workaround makes sure Storybook adds CSS prefixes
// Ref: https://github.com/storybookjs/storybook/issues/23234
module.exports = {
  plugins: {
    autoprefixer: {},
  },
}
