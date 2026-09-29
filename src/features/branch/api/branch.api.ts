import { api } from '#/api/axios'

export type BranchData = {
  branch: {
    id: number
    code: string
    name: string
  }
  userId: number
  message: string
}

export async function getBranchData() {
  const response = await api.get<BranchData>(
    '/branch/data',
  )

  return response.data
}