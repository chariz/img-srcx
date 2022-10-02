<h2 align="center">
<img src="https://github.githubassets.com/images/icons/emoji/unicode/1f5bc.png">
<br>
img-srcx
</h2>

**Tiny JSX helper function for high-DPI (Retina Display) images.**

394 bytes minified and gzipped for ESM (830 bytes for ES5).

## Installation

```bash
npm install --save img-srcx
# or
yarn install img-srcx
# or
pnpm install img-srcx
```

If you’re using this in older runtimes, such as node 8, Internet Explorer, or Android before 4.4.4, you’ll need to use a [`URL` polyfill](https://github.com/zloirock/core-js#url-and-urlsearchparams). You may find [Can I use `URL`?](https://caniuse.com/url) useful.

## Example
```tsx
import { srcx, type Scale } from "img-srcx";

function MyImageComponent({ src, forceScale }: { src: string; forceScale?: Scale; }) {
	return <img {...srcx(src, { forceScale })} />;
}

function Root() {
	return (
		<div>
			<MyImageComponent src="https://repo.chariz.com/CydiaIcon.png" />
			<MyImageComponent src="https://www.google.com/google.jpg" forceScale={1} />
			<MyImageComponent src="https://github.githubassets.com/favicons/favicon.svg" />
		</div>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementById("root")
);
```

Yields the following rendered HTML:

```html
<div>
	<img
		src="https://repo.chariz.com/CydiaIcon.png"
		srcSet="https://repo.chariz.com/CydiaIcon@2x.png 2x,https://repo.chariz.com/CydiaIcon@3x.png 3x">

	<img
		src="https://www.google.com/google.jpg">

	<img
		src="https://github.githubassets.com/favicons/favicon.svg">
</div>
```

## Usage
### `srcx(src: string, options?: { scales?: Scale[], forceScale?: Scale }): { src: string; srcSet?: string }`
Returns JSX properties for use on an `<img>` element. The `src` and `srcSet` attributes set as appropriate for the given parameters.

* **src**: The URL of the image to be displayed. Will be passed through exactly as the `src` attribute, unless `forceScale` is set.
* **options**: Optional object with the following properties:
	* **scales**: An array of image scales to use. Defaults to `[1, 2, 3]`. The lowest scale will be used as the `src` attribute, and the remainder will be used as the `srcSet` attribute, unless `forceScale` is set.
	* **forceScale**: The minimum scale to use. If set, the `src` attribute will be set to the URL matching the given scale, and the `srcSet` attribute will be set to the remaining scales above the given scale.

Paths ending in `.svg` will be returned as-is, without `srcSet`.

### `Scale`
A type for indicating scale factors. This is defined to `1 | 2 | 3`, matching the common scale factors for high-DPI images.

## Credits
<p align="center">
<a href="https://chariz.com/">
<img src="https://chariz.com/img/chariz-logo-head@3x.png" width="166" height="60">
</a>
</p>

Developed by [Chariz](https://chariz.com/):

* [Adam Demasi (@kirb)](https://github.com/kirb)

## License
Licensed under the Apache License, version 2.0. Refer to [LICENSE.md](https://github.com/chariz/srcx/blob/main/LICENSE.md).
