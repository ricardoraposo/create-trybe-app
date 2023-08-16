/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import * as readline from 'node:readline';
import { type Prompt } from '@inquirer/type';
import MuteStream from 'mute-stream';
export { usePrefix } from './lib/prefix.mjs';
export * from './lib/key.mjs';
export * from './lib/Separator.mjs';
export type InquirerReadline = readline.ReadLine & {
    output: MuteStream;
    input: NodeJS.ReadableStream;
    clearLine: (dir: 0 | 1 | -1) => void;
};
export type KeypressEvent = {
    name: string;
    ctrl: boolean;
};
type NotFunction<T> = T extends Function ? never : T;
export declare function useState<Value>(defaultValue: NotFunction<Value> | (() => Value)): [Value, (newValue: Value) => void];
export declare function useEffect(cb: (rl: InquirerReadline) => void | (() => void), depArray: unknown[]): void;
export declare function useKeypress(userHandler: (event: KeypressEvent, rl: InquirerReadline) => void): void;
export declare function useRef<Value>(val: Value): {
    current: Value;
};
export declare function usePagination(output: string, { active, pageSize, }: {
    active: number;
    pageSize?: number;
}): string;
export type AsyncPromptConfig = {
    message: string | Promise<string> | (() => Promise<string>);
    validate?: (value: string) => boolean | string | Promise<string | boolean>;
};
export type ResolvedPromptConfig = {
    message: string;
    validate: (value: string) => boolean | string | Promise<string | boolean>;
};
export declare function createPrompt<Value, Config extends AsyncPromptConfig>(view: (config: Config & ResolvedPromptConfig, done: (value: Value) => void) => string | [string, string | undefined]): Prompt<Value, Config>;
