import type { AsyncPromptConfig, ResolvedPromptConfig } from '../index.mjs';
export declare function getPromptConfig<In extends AsyncPromptConfig>(option: In): Promise<In & ResolvedPromptConfig>;
