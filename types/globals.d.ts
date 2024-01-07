import "@tanstack/react-table"

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

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    thClassName?: string
    tdClassName?: string
  }
}
