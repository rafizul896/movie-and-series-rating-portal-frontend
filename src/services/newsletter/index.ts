'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

const BASE_API = process.env.NEXT_PUBLIC_BASE_API as string

// 2. Get all newsletters
export const getAllNewsletters = async () => {
  try {
    const res = await fetch(`${BASE_API}/newsletter`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: { tags: ['newsletters'] },
    })

    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}

// 2. Get all newsletters by userId
export const getAllNewslettersByUserID = async (userId:string) => {
  try {
    console.log('Fetching newsletters for user:', userId)
    const res = await fetch(`${BASE_API}/newsletter/newsletter-record/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: { tags: ['newsletters'] },
    })

    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}
// 1. Create newsletter
export const createNewsletter = async (payload: any) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(payload),
    })

    revalidateTag('newsletters')
    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}


// 3. Get newsletter by ID
export const getNewsletterById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter/${id}`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    })

    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}

// 4. Delete newsletter
export const deleteNewsletter = async (id: string) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    })

    revalidateTag('newsletters')
    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}

// 5. Update newsletter
export const updateNewsletter = async (id: string, payload: any) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(payload),
    })

    revalidateTag('newsletters')
    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}

// 6. Subscribe
export const subscribeToNewsletter = async (email: string, name: string, userId?: string) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, userId }),
    })

    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}

// 7. Unsubscribe
export const unsubscribeFromNewsletter = async (email: string) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}

// 8. Send newsletter
export const sendNewsletter = async (id: string) => {
  try {
    const res = await fetch(`${BASE_API}/newsletter/send/${id}`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    })

    revalidateTag('newsletters')

    return await res.json()
  } catch (error:any) {
    return Error(error)
  }
}
