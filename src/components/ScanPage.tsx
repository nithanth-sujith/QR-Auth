import { useAuthStore } from '#/auth/auth-store'
import { getBranchData } from '#/features/branch/api/branch.api'
import { useQrSessionEvents } from '#/features/qr-auth/hooks/useQrSessionEvents'
import { useNavigate } from '@tanstack/react-router'
import Qrcode from './qrcode'

type ScanPageProps = {
    qrSession: {
        sessionId: string
        nanoUuid: string
        expiresAt: string
    }
}

const ScanPage = ({ qrSession }: ScanPageProps) => {

    const setTokens = useAuthStore(
        (state) => state.setTokens,
    )

    const navigate = useNavigate()

    useQrSessionEvents({
        sessionId: qrSession.sessionId,
        onAuthenticated: async (data) => {
            setTokens(
                data.accessToken,
                data.refreshToken,
            )

            await navigate({
                to: '/digital-signage/display',
            })
        },
    })




    const qrValue = `centrim://auth?session=${qrSession.sessionId}`
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className='w-4xl flex h-fit rounded-xl bg-blue-50 p-10'>
                <div className='flex-1 flex flex-col gap-3'>
                    <h1 className='text-5xl font-bold '>Scan QR Code</h1>
                    <p className='text-lg w-8/10 leading-5.5 font-semibold text-gray-500'>Scan this code with your phone to view the menu displayed on this screen.</p>
                    <ul className='ml-5'>
                        <li className='text-md text-gray-700'>1. Open your phone's camera app</li>
                        <li className='text-md text-gray-700'>2. Point it at the QR code</li>
                        <li className='text-md text-gray-700'>3. Enter the unique branch code</li>
                    </ul>
                </div>
                <div className='flex h-full bg-white w-fit p-5 rounded-xl flex-col gap-2'>
                    <Qrcode value={qrValue} />
                    <div className='flex justify-center items-center w-fit border rounded-md border-gray-300 mx-auto mt-2 px-3 py-1'>
                        <p className='text-center text-lg text-gray-500 font-semibold'>{qrSession.nanoUuid}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScanPage
