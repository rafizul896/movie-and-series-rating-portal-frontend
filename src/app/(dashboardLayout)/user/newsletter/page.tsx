import UserNewsletterHistoryPage from '@/components/modules/UserNewsLetter/UserNewsletterHistory'
import React from 'react'

const UserNewsLetterHistorySection = async() => {
  return (
    <div className="container mx-auto">
          <div className="text-center mt-10">
        <h1 className="text-2xl  sm:text-3xl font-bold text-white">
          Newsletter History
        </h1>
      </div>

      <div className="text-white rounded-xl shadow-md  overflow-x-auto mx-auto">
        <UserNewsletterHistoryPage/>
        {/* <p className="p-4">No newsletter history available.</p> */}
      </div>
    </div>
  )
}

export default UserNewsLetterHistorySection