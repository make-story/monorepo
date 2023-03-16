export declare global {
  /**
   * Awaited polyfill
   * - 참고: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements
   */
  type Awaited<T> = T extends null | undefined
    ? T
    : T extends object & { then(onfulfilled: infer F): any }
    ? F extends (value: infer V, ...args: any) => any
      ? Awaited<V>
      : never
    : T;

  /**
   * Object 내의 일부 타입을 항목을 Required로 변경
   */
  type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
  /**
   * Type을 병합하면서, 겹치는 타입명이 있다면 덮어쓰기.
   */
  type OverrideMerge<T, U> = Omit<T, keyof U> & U;
}
