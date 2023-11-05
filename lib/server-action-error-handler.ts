export const serverActionErrorHandler =
  (
    serverAction: (
      ...args: any[]
    ) => Promise<{ message: string; data: unknown }>
  ) =>
  async (...args: any[]) => {
    try {
      return serverAction(...args)
    } catch (e: unknown) {
      if (e instanceof Error) {
        return { message: e.message }
      }

      return { message: "Something went wrong" }
    }
  }
