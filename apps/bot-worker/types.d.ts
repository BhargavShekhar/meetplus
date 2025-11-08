declare global {
  interface NodeErrorEvent extends Error {
    type: string;
    error?: unknown;
  }

  var ErrorEvent: { new (type: string, options?: { error?: unknown; message?: string }): NodeErrorEvent } | undefined;
}

export {}