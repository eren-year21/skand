import * as t from 'io-ts';

export interface IAppStore {}

export type TAppStore = { [K in keyof IAppStore]: t.Type<IAppStore[K], unknown, unknown>; };

export const TApplicationStore: TAppStore = {};

export interface IEnvironment {}
