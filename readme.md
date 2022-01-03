# rose-pine-css

> Soho vibes from [rose-pine](https://github.com/rose-pine/rose-pine-theme), as css variables

This is not from the offical devs which I wish find time to get this done in the official package, but till then, I made one for my own use

## Why?

I use css and css variables more than css modules or inline styles so, this is kinda a needed in most of my web projects, considering I like the color pallete quite a bit.

## Usage

It's a css package, there's no other imports

- You can use a npm cdn to get the css file

```css
<link rel="stylesheet" href="https://unpkg.com/@barelyhuman/rose-pine-css@0.0.1/rose-pine.css">
/* for v2 / still not released by rose-pine/palette */
<link rel="stylesheet" href="https://unpkg.com/@barelyhuman/rose-pine-css@next/rose-pine.css">
```

- or you can install the package and import the css (your bundler needs to support css imports)

```js
import '@barelyhuman/rose-pine-css/rose-pine.css'
```

## Credits

For the original project by

- [mvllow](https://github.com/mvllow)
- [fvrests](https://github.com/fvrests)

## License

[MIT](/LICENSE)

## Dev notes

1. Node version >= 12 (needs ESM)
2. The releases are made from the `dist` folder. So, `cd dist; npm pub`
3. Do not use `np` as the version change is to be done on the root folder and then `npm run build` to create a release folder
4. Check the change using unpkg and a react boilerplate that has css loaders enabled
