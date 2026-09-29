import { api } from "#/api/axios"


export type CreateQrSessionResponse = {
  sessionId: string
  nanoUuid: string
  expiresAt: string
}

export async function createQrSession() {
  const response = await api.post<CreateQrSessionResponse>(
    '/sessions',
  )

  return response.data
}