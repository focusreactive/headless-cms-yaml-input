# React-Yaml

Yaml input field with validation and syntax highlighting as React Component

## Install

```
npm i --save @focus-reactive/react-yaml
yarn add @focus-reactive/react-yaml
```

## Usage

```jsx
const obj = { foo: 'bar' };
const handleChange = (value) => {
  console.log(value);
  // { foo: 'bar' }
}

return <YamlEditor json={obj} onChange={handleChange} />
```

```jsx
const text = `
foo: bar
`;

const handleChange = (value) => {
  console.log(value);
  // { foo: 'bar' }
}

return <YamlEditor text={text} onChange={handleChange} />

```

## Features

tbd

## Credits

<div align="left" style="height: 16px;">Created with ❤︎ to <b>React</b> and Open Source community by <a href="https://twitter.com/UsulPro">Oleg Proskurin</a> at <a href="https://twitter.com/FocusReactive">FocusReactive</a>
</div>

2021

[![FocusReactive](https://raw.githubusercontent.com/focusreactive/storybook-graphql-kit/master/docs/focusreactive-logo.svg?sanitize=true)](https://focusreactive.com)
