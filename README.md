# Vue 3 Native Dialog Component

A vue3 Component [used native Dialog](https://developer.mozilla.org/de/docs/Web/HTML/Element/dialog).

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/webdesignberlin/vue-native-dialog/CI?style=for-the-badge)
![Test Coverage 100/100](https://img.shields.io/badge/Coverage-100%2F100-green?style=for-the-badge)

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Docs
[Demo as interactive Storybook Playground](https://vue3-native-dialog.netlify.app/)

## Install
```
npm install vue3-native-dialog
```

## Usage
As vue sfc:
```vue
<script type="setup">
import { NativeDialog } from 'vue3-native-dialog';
</script>
<template>
  <native-dialog />
</template>
<style>
@import 'vue3-native-dialog/style.css';
</style>
```

## Contribute
### Build and Test
```
npm run build
npm run storyook
npm run run test:unit
npm run run test:e2e
```
