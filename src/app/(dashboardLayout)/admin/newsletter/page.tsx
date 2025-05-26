
import Newsletter from '@/components/modules/adminDashboard/Newsletter/NewsLetterManagement';
import { getAllNewsletters } from '@/services/newsletter'
import React from 'react'

const NewsLetterPage = async() => {
 const response = await getAllNewsletters();
 const data = await response?.data;
  return (
    <div>
        <Newsletter newslettersData={data}/>
    </div>
  )
}

export default NewsLetterPage