import { getServerSession } from "next-auth"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { authOptions } from "@/lib/auth-options"
import db from "@/lib/db"
import { validateSchema } from "@/lib/validate-schema"
import { storeSchema } from "@/lib/validation-schemas/create-store"

const POST = apiRequestMiddleware({
  handler: async (req: Request) => {
    const body = await req.json()
    const { name } = validateSchema(body, storeSchema)
    const session = await getServerSession(authOptions)

    await db.store.create({
      data: {
        name,
        userId: session!.user.id,
      },
    })

    return new Response(null, { status: 201 })
  },
})

export { POST }
