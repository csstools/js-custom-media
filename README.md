# JS Custom Media [<img src="http://jonathantneal.github.io/js-logo.svg" alt="" width="90" height="90" align="right">][JS Custom Media]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[JS Custom Media] lets you use Custom Media Queries in JS, following the
[CSS Media Queries] specification.

```bash
npm install js-custom-media
```

## Usage

```js
import { customMedia, polyfillMatchMedia } from 'js-custom-media';

// define a custom media query
customMedia.set('--md', '(width > 640px)');

// polyfill `window.matchMedia`
const matchMedia = polyfillMatchMedia(window.matchMedia);

// match a custom media query
mq = matchMedia('(--md)');
mq.addListener(update);

// apply the custom media query
function update() {
  // do something with `mq.matches`
}

update();
```

A typical implementation of this script is about 576 bytes minified and gzipped.

### Usage with PostCSS Custom Media

[PostCSS Custom Media] lets you import Custom Media from external files. These
files can be used by this library as well.

```js
import { extensions, polyfillMatchMedia } from 'js-custom-media';

// get variables that include `'custom-media'` (or `customMedia`)
import variables from 'path/to/variables.json';

// add variables’ custom media to `extensions`
Object.assign(extensions, variables['custom-media']);

// get built-in support for variables’ custom media
window.matchMedia = polyfillMatchMedia(window.matchMedia);
```

## Features

### polyfillMatchMedia

The `polyfillMatchMedia` method returns a wrapped version of `matchMedia` that
can parse custom media queries.

```js
import { polyfillMatchMedia } from 'js-custom-media';

const matchMedia = polyfillMatchMedia(window.matchMedia); // works like window.matchMedia
```

### customMedia

The `customMedia` object includes 2 methods for getting and setting custom
media queries.

#### set

The `set` method adds a custom media query that is readable by the wrapped
version of `matchMedia`.

```js
import { customMedia } from 'js-custom-media';

customMedia.set('--md', '(min-width: 640px)');
```

#### get

The `get` method returns the value of a custom media query.

```js
import { customMedia } from 'js-custom-media';

CSS.customMedia.get('--md'); // (min-width: 640px)
```

### extensions

The `extensions` object is the internal map of custom media queries used by
[customMedia](#custommedia) and [polyfillMatchMedia](#polyfillmatchmedia).

This can only be used for non-standard behavior, such as
[Usage with PostCSS Custom Media](#usage-with-postcss-custom-media).

```js
import { extensions } from 'js-custom-media';

extensions['--some-mq'] = '(width >= 960px)'; // add custom media queries in a non-standard way
```

[cli-img]: https://img.shields.io/travis/csstools/js-custom-media.svg
[cli-url]: https://travis-ci.org/csstools/js-custom-media
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/js-custom-media.svg
[npm-url]: https://www.npmjs.com/package/js-custom-media

[CSS Media Queries]: https://drafts.csswg.org/mediaqueries-5/#custom-mq
[JS Custom Media]: https://github.com/csstools/js-custom-media
[PostCSS Custom Media]: https://github.com/postcss/postcss-custom-media/
