interface ServerAction {
  (...args: any[]): Promise<
    | {
        success: {
          message: string
          data?: unknown
        }
        error?: undefined
      }
    | {
        error: {
          message: string
        }
        success?: undefined
      }
  >
}
