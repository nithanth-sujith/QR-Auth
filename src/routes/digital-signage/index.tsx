import ScanPage from '#/components/ScanPage'
import { createQrSession } from '#/features/qr-auth/api/qr-auth.api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/digital-signage/')({
  beforeLoad: async () => {
    const qrSession = await createQrSession()

    return {
      qrSession,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { qrSession } = Route.useRouteContext()
  return (
    <ScanPage qrSession={qrSession} />
  )
}
