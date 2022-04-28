export const decorators = [(story) => ({
  components: { story },
  template: '<div style="min-height: 18vh;"><story /></div>'
})];

export const parameters = {
  viewMode: 'docs',
  previewTabs: { canvas: { hidden: true } },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
