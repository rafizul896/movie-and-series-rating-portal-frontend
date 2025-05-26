import UserNewsletterHistoryPage from '@/components/modules/UserNewsLetter/UserNewsletterHistory'
import React from 'react'

const UserNewsLetterHistorySection = async() => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl mt-10 sm:text-3xl font-bold text-white">
          Newsletter History
        </h1>
      </div>

      <div className="text-white rounded-xl shadow-md  overflow-x-auto mx-auto">
        {/* Placeholder for newsletter history table */}
        <UserNewsletterHistoryPage/>
        {/* <p className="p-4">No newsletter history available.</p> */}
      </div>
    </div>
  )
}

export default UserNewsLetterHistorySection