type WindowNamespace = typeof window

export type IpcNamespace<NamespaceName extends keyof WindowNamespace> =
  WindowNamespace[NamespaceName]

export type IpcListenerParameters<
  NamespaceName extends keyof WindowNamespace,
  FunctionName extends keyof IpcNamespace<NamespaceName>,
> = Parameters<IpcNamespace<NamespaceName>[FunctionName]>
