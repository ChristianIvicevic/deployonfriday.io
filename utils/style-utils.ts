export type Transient<P> = {
  [K in keyof P as `$${string & K}`]: P[K];
};
