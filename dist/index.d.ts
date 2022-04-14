/**
 * Image loader options.
 */
export declare class RawImageLoaderOptions {
    /**
     * Should image loader use cache or not.
     * If used all images are saved and can be fetched again.
     */
    useCache?: boolean;
}
/**
 * Gets the image data result as U32 array.
 */
export declare class U32ImageData {
    /**
     * Image width.
     */
    width: number;
    /**
     * Image height.
     */
    height: number;
    /**
     * Data as U32 array.
     */
    data: Uint32Array;
}
/**
 * Gets the image data result as U8 array.
 */
export declare class U8ImageData {
    /**
     * Image width.
     */
    width: number;
    /**
     * Image height.
     */
    height: number;
    /**
     * Data as U8 array.
     */
    data: Uint8ClampedArray;
}
/**
 * The image loader class.
 * If it's used like an instance there is caching of an image request as long as instance is alive.
 */
export declare class RawImageLoader {
    private __cache;
    private __useCache;
    /**
     * The constructor
     * @param { RawImageLoaderOptions } options
     *
     * by default cache is used.
     */
    constructor(options?: RawImageLoaderOptions);
    /**
     * Helper method for working with bytes.
     * Converts the u8 bytes array to u32 bytes array.
     * @param { Uint8ClampedArray } bytes
     * @returns { Uint32Array }
     */
    convertU8ToU32Bytes(bytes: Uint8ClampedArray): Uint32Array;
    /**
     * Helper method for working with bytes.
     * Converts the u8 bytes array to u32 bytes array.
     * @param { Uint8ClampedArray } bytes
     * @returns { Uint32Array }
     */
    static convertU8ToU32Bytes(bytes: Uint8ClampedArray): Uint32Array;
    /**
    * Load an image from source. Can also reject promise if src is not found.
    * @param { string } src
    * @returns { Promise<HTMLImageElement> }
    */
    loadImageAsync(src: string): Promise<HTMLImageElement>;
    /**
     * Load the image and get image bytes as Uint8ClampedArray
     * @param { HTMLCanvasElement } canvas
     * @param { string } src
     * @returns { Promise<U8ImageData> }
     */
    loadAndGetBytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U8ImageData>;
    /**
     * Load the image and get image bytes as Uint32Array
     * @param { HTMLCanvasElement } canvas
     * @param { string } src
     * @returns { Promise<IU32ImageData> }
     */
    loadAndGetU32BytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U32ImageData>;
    /**
     * Loads and get U32 bytes from HTMLImage
     * @param { HTMLCanvasElement } canvas
     * @param { HTMLImageElement } image
     * @returns { IU8ImageData }
     */
    loadAndGetU32BytesAsyncFromHTMLImage(canvas: HTMLCanvasElement, image: HTMLImageElement): U32ImageData;
    /**
     * Load an image from source. Can also reject promise if src is not found.
     * @param { string } src
     * @returns { Promise<HTMLImageElement> }
     */
    static loadImageAsync(src: string): Promise<HTMLImageElement>;
    /**
  * Load the image and get image bytes as Uint8ClampedArray
  * @param { HTMLCanvasElement } canvas
  * @param { string } src
  * @returns { Promise<IU8ImageData> }
  */
    static loadAndGetBytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U8ImageData>;
    /**
     * Load the image and get image bytes as Uint32Array
     * @param { HTMLCanvasElement } canvas
     * @param { string } src
     * @returns { Promise<IU32ImageData> }
     */
    static loadAndGetU32BytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U32ImageData>;
    /**
   * Loads and get U32 bytes from HTMLImage
   * @param { HTMLCanvasElement } canvas
   * @param { HTMLImageElement } image
   * @returns { IU8ImageData }
   */
    static loadAndGetU32BytesAsyncFromHTMLImage(canvas: HTMLCanvasElement, image: HTMLImageElement): U32ImageData;
}
