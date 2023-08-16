import type { AsyncPromptConfig, ResolvedPromptConfig } from '../index.js';
export declare function getPromptConfig<In extends AsyncPromptConfig>(option: In): Promise<In & ResolvedPromptConfig>;
