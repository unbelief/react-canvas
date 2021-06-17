# react-canvas

> A library of React components created on canvas.

[![NPM](https://img.shields.io/npm/v/react-canvas.svg)](https://www.npmjs.com/package/react-canvas) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# npm install github:unbelief/react-canvas
yarn add git+ssh:git@github.com:unbelief/react-canvas.git
# npm install git+ `#branch` or `#tag`
# npm help install
```

## Usage

```tsx
import React, { Component } from "react";
import { Scene, Text, Image, Table } from "react-canvas";
import "react-canvas/dist/index.css";

function App() {
  return (
    <Scene
      attribute={{
        width: 500,
        height: 350,
      }}
    >
    <Text />
    <Image />
    <Table />
    </Scene>
}
```

![preview](https://raw.githubusercontent.com/unbelief/react-canvas/tree/master/dist/8FAB98DD-ECCE-433D-9B74-D13DF1753FFC.png)

## License

MIT © [unbelief](https://github.com/unbelief)
