# Installation
> `npm install --save @types/mute-stream`

# Summary
This package contains type definitions for mute-stream (https://github.com/isaacs/mute-stream#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mute-stream.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mute-stream/index.d.ts)
````ts
// Type definitions for mute-stream 0.0
// Project: https://github.com/isaacs/mute-stream#readme
// Definitions by: Adam Jarret <https://github.com/adamjarret>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { Duplex } from 'stream';

declare namespace MuteStream {
    interface Options {
        /**
         * Set to a string to replace each character with the specified string when muted.
         * (So you can show **** instead of the password, for example.)
         */
        replace?: string | undefined;

        /**
         * If you are using a replacement char, and also using a prompt with a readline stream
         * (as for a Password: ***** input), then specify what the prompt is so that backspace
         * will work properly. Otherwise, pressing backspace will overwrite the prompt with the
         * replacement character, which is weird.
         */
        prompt?: string | undefined;
    }
}

declare class MuteStream extends Duplex {
    constructor(options?: MuteStream.Options);
    mute: () => void;
    unmute: () => void;
    isTTY: boolean;
}

export = MuteStream;

````

### Additional Details
 * Last updated: Wed, 07 Jul 2021 00:01:45 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)
 * Global values: none

# Credits
These definitions were written by [Adam Jarret](https://github.com/adamjarret).
