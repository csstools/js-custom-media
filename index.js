const customMediaQueryNameRegExp = /^--[\w-]+$/;
const mediaQueryRangeRegExp = /(?:([-+]?[0-9]*\.?[0-9]+)(%|\w+)\s*(<|>)(=)?(\s*))?(aspect-ratio|color|height|monochrome|resolution|width)(?:\s*(<|>)(=)?(\s*)([-+]?[0-9]*\.?[0-9]+)(%|\w+))?/g;

export const extensions = {};

export const customMedia = {
	get(name) {
		if (!arguments.length) {
			throw new TypeError('Failed to execute \'get\' on \'customMedia\': 1 argument required, but only 0 present.');
		}

		return extensions[name];
	},
	set(name, value) {
		if (arguments.length < 2) {
			throw new TypeError('Failed to execute \'set\' on \'customMedia\': 2 arguments required, but only ' + arguments.length + ' present.');
		}

		if (customMediaQueryNameRegExp.test(name)) {
			extensions[name] = String(value);
		}
	}
};

export const polyfillMatchMedia = targetMatchMedia => function matchMedia(mediaQueryString) {
	let transformedMediaQueryString;
	let nextTransformedMediaQueryString = mediaQueryString;

	do {
		transformedMediaQueryString = nextTransformedMediaQueryString;

		nextTransformedMediaQueryString = Object.keys(extensions).reduce(
			// replace custom media queries
			(buffer, name) => buffer.replace('(' + name + ')', extensions[name]),
			transformedMediaQueryString
		).replace(
			// replace media query ranges
			mediaQueryRangeRegExp,
			($0, beforeFloat, beforeUnit, beforeGtLt, beforeEqual, beforeSpace, property, afterGtLt, afterEqual, afterSpace, afterFloat, afterUnit) => { // eslint-disable-line max-params
				if (!beforeFloat && !afterFloat) {
					return $0;
				}

				let transpiledQuery = '';

				if (beforeFloat) {
					transpiledQuery += (beforeGtLt === '<' ? 'min' : 'max') + '-' + property + ':' + beforeSpace + (beforeEqual ? beforeFloat : parseFloat(beforeFloat) + (beforeGtLt === '<' ? 1 : -1)) + beforeUnit;
				}

				if (beforeUnit && afterFloat) {
					transpiledQuery += ') and (';
				}

				if (afterFloat) {
					transpiledQuery += (afterGtLt === '<' ? 'max' : 'min') + '-' + property + ':' + afterSpace + (afterEqual ? afterFloat : parseFloat(afterFloat) + (afterGtLt === '<' ? -1 : 1)) + afterUnit;
				}

				return transpiledQuery;
			}
		);
	} while (
		transformedMediaQueryString !== nextTransformedMediaQueryString
	)

	return targetMatchMedia(transformedMediaQueryString);
};
