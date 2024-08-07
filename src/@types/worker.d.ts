declare module "worker-loader?*" {
  const Worker: new () => globalThis.Worker;

  export default Worker;
}
