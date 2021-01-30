declare module 'require-like' {
  function requireLike(path: string, uncached?: boolean): {
    [key: string]: any
  };

  export default requireLike;
}
