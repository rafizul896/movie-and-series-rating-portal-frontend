'use client'
import { Card, CardContent } from '@/components/ui/card'
import { TNewsletter } from '@/types/newsletter.type'
import { Calendar, FileText, Send, Users } from 'lucide-react'
import React from 'react'

const NewsletterStats = ({
  newslettersData = [],
}: {
  newslettersData?: TNewsletter[];
}) => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">
                    Total Newsletters
                  </p>
                  <p className="text-3xl font-bold text-blue-500">
                    {newslettersData?.length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Sent</p>
                  <p className="text-3xl font-bold text-green-500">
                    {newslettersData?.filter((n) => n.status === "SENT").length}
                  </p>
                </div>
                <Send className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Scheduled</p>
                  <p className="text-3xl font-bold text-yellow-500">
                    {
                      newslettersData?.filter((n) => n.status === "SCHEDULED")
                        .length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-red-600/50 shadow-lg  hover:shadow-red-600/40 transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">
                    Total Recipients
                  </p>
                  <p className="text-3xl font-bold text-purple-500">
                    {newslettersData?.reduce(
                      (sum, n) => sum + n.recipientCount,
                      0
                    )}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
  )
}

export default NewsletterStats