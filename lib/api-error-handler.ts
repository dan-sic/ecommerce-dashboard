import { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import createHttpError from "http-errors"
import { ZodError } from "zod"

export type ErrorResponse = {
  error: {
    message: string
    err?: unknown
  }
  statusCode?: number
}

/**
 * Handles errors thrown by the application and sends an appropriate response to the client.
 * @param err - The error that was thrown.
 * @param res - The response object to send the error response to.
 */
export const apiErrorHandler = (err: unknown) => {
  if (createHttpError.isHttpError(err) && err.expose) {
    return new Response(JSON.stringify({ error: { message: err.message } }), {
      status: err.statusCode,
    })
  }

  if (err instanceof ZodError) {
    return new Response(
      JSON.stringify({
        error: { message: err.errors.map((e) => e.message).join(", ") },
      }),
      {
        status: 400,
      }
    )
  }

  console.error(err)
  return new Response(
    JSON.stringify({
      error: { message: "Internal Server Error", err },
      statusCode: createHttpError.isHttpError(err) ? err.statusCode : 500,
    }),
    {
      status: 500,
    }
  )
}
