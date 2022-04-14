(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory();
	else
		root["index"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageLoader = exports.U8ImageData = exports.U32ImageData = exports.RawImageLoaderOptions = void 0;
/**
 * Image loader options.
 */
class RawImageLoaderOptions {
}
exports.RawImageLoaderOptions = RawImageLoaderOptions;
/**
 * Gets the image data result as U32 array.
 */
class U32ImageData {
}
exports.U32ImageData = U32ImageData;
/**
 * Gets the image data result as U8 array.
 */
class U8ImageData {
}
exports.U8ImageData = U8ImageData;
/**
 * The image loader class.
 * If it's used like an instance there is caching of an image request as long as instance is alive.
 */
class ImageLoader {
    /**
     * The constructor
     * @param { RawImageLoaderOptions } options
     *
     * by default cache is used.
     */
    constructor(options) {
        var _a;
        this.__cache = {};
        this.__useCache = (_a = options.useCache) !== null && _a !== void 0 ? _a : true;
    }
    /**
     * Helper method for working with bytes.
     * Converts the u8 bytes array to u32 bytes array.
     * @param { Uint8ClampedArray } bytes
     * @returns { Uint32Array }
     */
    convertU8ToU32Bytes(bytes) {
        return ImageLoader.convertU8ToU32Bytes(bytes);
    }
    /**
     * Helper method for working with bytes.
     * Converts the u8 bytes array to u32 bytes array.
     * @param { Uint8ClampedArray } bytes
     * @returns { Uint32Array }
     */
    static convertU8ToU32Bytes(bytes) {
        const u32_array = new Uint32Array(bytes.length / 4);
        // move all the bytes to U32.
        let k = 0;
        for (let i = 0; i < bytes.length; i += 4) {
            let n = bytes[i];
            n |= bytes[i + 1] << 8;
            n |= bytes[i + 2] << 16;
            n |= bytes[i + 3] << 24;
            u32_array[k] = n;
            k++;
        }
        return u32_array;
    }
    /**
    * Load an image from source. Can also reject promise if src is not found.
    * @param { string } src
    * @returns { Promise<HTMLImageElement> }
    */
    loadImageAsync(src) {
        // If cache is used, store image to cache and load from cache
        if (this.__useCache) {
            if (this.__cache[src]) {
                return this.__cache[src];
            }
            this.__cache[src] = new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = () => {
                    reject(`Unable to load image with src '${src}'!`);
                };
                image.src = src;
            });
            return this.__cache[src];
        }
        // No cache used, just return promise.
        else {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = () => {
                    reject(`Unable to load image with src '${src}'!`);
                };
                image.src = src;
            });
        }
    }
    /**
     * Load the image and get image bytes as Uint8ClampedArray
     * @param { HTMLCanvasElement } canvas
     * @param { string } src
     * @returns { Promise<U8ImageData> }
     */
    async loadAndGetBytesAsync(canvas, src) {
        const image = await this.loadImageAsync(src);
        const ctx = canvas.getContext("2d");
        const original_width = canvas.width;
        const original_height = canvas.height;
        ctx.save();
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const image_data = ctx.getImageData(0, 0, image.width, image.height);
        ctx.restore();
        canvas.width = original_width;
        canvas.height = original_height;
        return {
            data: image_data.data,
            width: image.width,
            height: image.height
        };
    }
    /**
     * Load the image and get image bytes as Uint32Array
     * @param { HTMLCanvasElement } canvas
     * @param { string } src
     * @returns { Promise<IU32ImageData> }
     */
    async loadAndGetU32BytesAsync(canvas, src) {
        const u8_data_result = await this.loadAndGetBytesAsync(canvas, src);
        const data = u8_data_result.data;
        return {
            data: this.convertU8ToU32Bytes(data),
            width: u8_data_result.width,
            height: u8_data_result.height,
        };
    }
    /**
     * Loads and get U32 bytes from HTMLImage
     * @param { HTMLCanvasElement } canvas
     * @param { HTMLImageElement } image
     * @returns { IU8ImageData }
     */
    loadAndGetU32BytesAsyncFromHTMLImage(canvas, image) {
        return ImageLoader.loadAndGetU32BytesAsyncFromHTMLImage(canvas, image);
    }
    /**
     * Load an image from source. Can also reject promise if src is not found.
     * @param { string } src
     * @returns { Promise<HTMLImageElement> }
     */
    static loadImageAsync(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => {
                reject(`Unable to load image with src '${src}'!`);
            };
            image.src = src;
        });
    }
    /**
  * Load the image and get image bytes as Uint8ClampedArray
  * @param { HTMLCanvasElement } canvas
  * @param { string } src
  * @returns { Promise<IU8ImageData> }
  */
    static async loadAndGetBytesAsync(canvas, src) {
        const image = await ImageLoader.loadImageAsync(src);
        const ctx = canvas.getContext("2d");
        ctx.save();
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const image_data = ctx.getImageData(9, 0, image.width, image.height);
        ctx.restore();
        return {
            data: image_data.data,
            width: image.width,
            height: image.height
        };
    }
    /**
     * Load the image and get image bytes as Uint32Array
     * @param { HTMLCanvasElement } canvas
     * @param { string } src
     * @returns { Promise<IU32ImageData> }
     */
    static async loadAndGetU32BytesAsync(canvas, src) {
        const u8_data_result = await ImageLoader.loadAndGetBytesAsync(canvas, src);
        const data = u8_data_result.data;
        return {
            data: ImageLoader.convertU8ToU32Bytes(data),
            width: u8_data_result.width,
            height: u8_data_result.height,
        };
    }
    /**
   * Loads and get U32 bytes from HTMLImage
   * @param { HTMLCanvasElement } canvas
   * @param { HTMLImageElement } image
   * @returns { IU8ImageData }
   */
    static loadAndGetU32BytesAsyncFromHTMLImage(canvas, image) {
        const ctx = canvas.getContext("2d");
        const original_width = canvas.width;
        const original_height = canvas.height;
        ctx.save();
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const image_data = ctx.getImageData(0, 0, image.width, image.height);
        ctx.restore();
        canvas.width = original_width;
        canvas.height = original_height;
        return {
            data: this.convertU8ToU32Bytes(image_data.data),
            width: image.width,
            height: image.height
        };
    }
}
exports.ImageLoader = ImageLoader;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});