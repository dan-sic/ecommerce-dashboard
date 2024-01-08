interface ServerAction {
  (...args: any[]): Promise<
    | {
        success: {
          message: string
          data?: any
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
