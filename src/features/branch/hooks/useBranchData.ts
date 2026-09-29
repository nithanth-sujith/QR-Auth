import { useQuery } from '@tanstack/react-query'
import { getBranchData } from '../api/branch.api'

export const branchKeys = {
  all: ['branch'] as const,
  data: () => [...branchKeys.all, 'data'] as const,
}

export function useBranchData() {
  return useQuery({
    queryKey: branchKeys.data(),
    queryFn: getBranchData,
  })
}