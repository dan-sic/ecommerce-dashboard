import axios from "axios"

import { getEnvVariable } from "./get-env-variable"

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
})
