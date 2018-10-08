import { customMedia, polyfillMatchMedia } from '../index'

if (!window.CSS) {
	window.CSS = {};
}

window.CSS.customMedia = customMedia;
window.matchMedia = polyfillMatchMedia(window.matchMedia);
