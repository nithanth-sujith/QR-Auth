import React from 'react'

interface BranchDataProps {
    branchData: {
        id: number
        code: string
        name: string
    }
}

const BranchData = ({ branchData }: BranchDataProps) => {
    return (
        <div className='flex w-full h-screen flex-col justify-center items-center'>
            <div className='flex flex-col bg-blue-50 p-5 rounded-md '>
                <p className='text-lg font-semibold'>ID: {branchData.id}</p>
                <p className='text-lg font-semibold'>Name: {branchData.name}</p>
                <p className='text-lg font-semibold'>Code: {branchData.code}</p>

            </div>
        </div>
    )
}

export default BranchData
