/**
 * Image loader options.
 */
export class RawImageLoaderOptions 
{
    /**
     * Should image loader use cache or not.
     * If used all images are saved and can be fetched again.
     */
    useCache?: boolean;
}


/**
 * Gets the image data result as U32 array.
 */
export class U32ImageData 
{
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
export class U8ImageData 
{
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
export class ImageLoader
{
    private __cache: { [id: string]: Promise<HTMLImageElement> } = {};

    private __useCache;

    /**
     * The constructor 
     * @param { RawImageLoaderOptions } options 
     * 
     * by default cache is used.
     */
    constructor(options?: RawImageLoaderOptions)
    {
        this.__useCache = options.useCache ?? true;
    }

    /**
     * Helper method for working with bytes.
     * Converts the u8 bytes array to u32 bytes array.  
     * @param { Uint8ClampedArray } bytes 
     * @returns { Uint32Array }
     */
    public convertU8ToU32Bytes(bytes: Uint8ClampedArray): Uint32Array 
    {
        return ImageLoader.convertU8ToU32Bytes(bytes);
    }

    /**
     * Helper method for working with bytes.
     * Converts the u8 bytes array to u32 bytes array.  
     * @param { Uint8ClampedArray } bytes 
     * @returns { Uint32Array }
     */
    public static convertU8ToU32Bytes(bytes: Uint8ClampedArray): Uint32Array 
    {
        const u32_array = new Uint32Array(bytes.length / 4);

        // move all the bytes to U32.
        let k = 0;
        for (let i = 0; i < bytes.length; i += 4)
        {
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
    public loadImageAsync(src: string): Promise<HTMLImageElement>
    {
        // If cache is used, store image to cache and load from cache
        if (this.__useCache)
        {
            if (this.__cache[src])
            {
                return this.__cache[src];
            }

            this.__cache[src] = new Promise((resolve, reject) => 
            {
                const image = new Image();
                image.onload = () =>
                {
                    resolve(image);
                }
                image.onerror = () =>
                {
                    reject(`Unable to load image with src '${src}'!`);
                }
                image.src = src;
            });


            return this.__cache[src];
        }
        // No cache used, just return promise.
        else
        {
            return new Promise((resolve, reject) => 
            {
                const image = new Image();
                image.onload = () =>
                {
                    resolve(image);
                }
                image.onerror = () =>
                {
                    reject(`Unable to load image with src '${src}'!`);
                }
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
    public async loadAndGetBytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U8ImageData>
    {
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
        }
    }


    /**
     * Load the image and get image bytes as Uint32Array
     * @param { HTMLCanvasElement } canvas 
     * @param { string } src 
     * @returns { Promise<IU32ImageData> }
     */
    public async loadAndGetU32BytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U32ImageData>
    {
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
    public loadAndGetU32BytesAsyncFromHTMLImage(canvas: HTMLCanvasElement, image: HTMLImageElement): U32ImageData
    {
        return ImageLoader.loadAndGetU32BytesAsyncFromHTMLImage(canvas, image);
    }

    /**
     * Load an image from source. Can also reject promise if src is not found.
     * @param { string } src 
     * @returns { Promise<HTMLImageElement> }
     */
    public static loadImageAsync(src: string): Promise<HTMLImageElement>
    {
        return new Promise((resolve, reject) => 
        {
            const image = new Image();
            image.onload = () =>
            {
                resolve(image);
            }
            image.onerror = () =>
            {
                reject(`Unable to load image with src '${src}'!`);
            }
            image.src = src;
        });
    }

    /**
  * Load the image and get image bytes as Uint8ClampedArray
  * @param { HTMLCanvasElement } canvas 
  * @param { string } src 
  * @returns { Promise<IU8ImageData> }
  */
    public static async loadAndGetBytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U8ImageData>
    {
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
    public static async loadAndGetU32BytesAsync(canvas: HTMLCanvasElement, src: string): Promise<U32ImageData>
    {
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
    public static loadAndGetU32BytesAsyncFromHTMLImage(canvas: HTMLCanvasElement, image: HTMLImageElement): U32ImageData
    {
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
        }
    }
}