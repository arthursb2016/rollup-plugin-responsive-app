import { Options } from './types';
export default function (data?: Options): {
    name: string;
    transform: {
        order: string;
        handler(code: string, id: string): {
            code: string;
            map: import("magic-string").SourceMap;
        } | null;
    };
};
