export declare const createAction: Function;
export declare const actionsFrom: (am: any) => {};
export declare const reducerFrom: (i: any, a: any) => (s: any, { type: t, payload: p }: {
    type: any;
    payload: any;
}) => any;
export declare const generateAsyncFlow: (t: any) => (a: any) => (n: any, s: any, { payload: p }: {
    payload: any;
}) => Promise<void>;
export declare const asyncMiddlewareFrom: (am: any) => (s: any) => (n: any) => (a: any) => Promise<void>;
export declare const middlewareFrom: (am: any) => (s: any) => (n: any) => (a: any) => Promise<void>;
