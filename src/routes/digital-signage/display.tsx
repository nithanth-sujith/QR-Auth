import { useAuthStore } from '#/auth/auth-store'
import BranchData from '#/components/BranchData'
import { getBranchData } from '#/features/branch/api/branch.api'
import { branchKeys } from '#/features/branch/hooks/useBranchData'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/digital-signage/display')({
  beforeLoad: async ({ context }) => {
    try {
      const branchData = await context.queryClient.ensureQueryData({
        queryKey: branchKeys.data(),
        queryFn: getBranchData,
      })
      console.log(branchData)
      return {
        branchData,
      }
    } catch (error) {
      throw redirect({
        to: '/digital-signage'
      })
    }

  },
  component: RouteComponent,
})

function RouteComponent() {
  const { branchData } = Route.useRouteContext()
  return <BranchData branchData={branchData.branch} />
}
