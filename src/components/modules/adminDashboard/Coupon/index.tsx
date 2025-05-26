// "use client";

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Calendar, Clock, Copy, Edit, Eye, Loader2, Mail, Percent, Plus, Search, Send, Tag, Trash, Users } from 'lucide-react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar as CalendarComponent } from "@/components/ui/calendar"
// import { format } from "date-fns"
// import { Progress } from "@/components/ui/progress"

// type TCoupon = {
//   id: string;
//   code: string;
//   discountType: "PERCENTAGE" | "FIXED";
//   discountValue: number;
//   usageCount: number;
//   usageLimit: number | null;
//   validFrom: string;
//   validUntil: string | null;
//   status: "ACTIVE" | "EXPIRED";
// }
// const CouponManagement = () => {
//   const [coupons, setCoupons] = useState<TCoupon[] | []>([]);

//   // Coupon States
//   const [newCoupon, setNewCoupon] = useState<TCoupon | {}>({
//     code: "SUMMER25",
//     discountType: "PERCENTAGE",
//     discountValue: 25,
//     minPurchase: 0,
//     maxDiscount: 50,
//     validFrom: new Date(),
//     validUntil: null,
//     usageLimit: 1000,
//     isActive: true,
//   });

//   useEffect(() => {
//     setCoupons([
//       {
//         id: "1",
//         code: "SUMMER25",
//         discountType: "PERCENTAGE",
//         discountValue: 25,
//         usageCount: 342,
//         usageLimit: 1000,
//         validFrom: "2023-06-01",
//         validUntil: "2023-09-01",
//         status: "ACTIVE",
//       },
//       {
//         id: "2",
//         code: "WELCOME10",
//         discountType: "FIXED",
//         discountValue: 10,
//         usageCount: 150,
//         usageLimit: null,
//         validFrom: "2023-01-01",
//         validUntil: null,
//         status: "ACTIVE",
//       },
//     ]);
//   }, []);



//   const handleCreateCoupon = async () => {
//     const coupon = {
//       id: String(coupons.length + 1),
//       ...newCoupon,
//       usageCount: 0,
//       status: "ACTIVE"
//     }
//     setCoupons([coupon, ...coupons])
//     setNewCoupon({
//       code: "",
//       discountType: "PERCENTAGE",
//       discountValue: 25,
//       minPurchase: 0,
//       maxDiscount: 50,
//       validFrom: new Date(),
//       validUntil: null,
//       usageLimit: 1000,
//       isActive: true
//     })
//   }
//   return <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold">Marketing Tools</h1>
        
//       </div>

//       {/* Coupons Section */}
   
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Create New Coupon</CardTitle>
//               <CardDescription>Boost sales with special offers</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Code</Label>
//                   <Input 
//                     value={newCoupon?.code}
//                     onChange={e => setNewCoupon({...newCoupon, code: e.target.value})}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Discount Type</Label>
//                   <Select
//                     value={newCoupon?.discountType}
//                     onValueChange={value => setNewCoupon({...newCoupon, discountType: value})}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="PERCENTAGE">Percentage</SelectItem>
//                       <SelectItem value="FIXED">Fixed Amount</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Discount Value</Label>
//                   <div className="relative">
//                     <Input
//                       type="number"
//                       value={newCoupon?.discountValue}
//                       onChange={e => setNewCoupon({...newCoupon, discountValue: e.target.value})}
//                     />
//                     {newCoupon?.discountType === "PERCENTAGE" && (
//                       <span className="absolute right-3 top-2.5">%</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Usage Limit</Label>
//                   <Input
//                     type="number"
//                     value={newCoupon?.usageLimit}
//                     onChange={e => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Valid From</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" className="w-full">
//                         <Calendar className="mr-2 h-4 w-4" />
//                         {format(newCoupon?.validFrom, "PPP")}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent>
//                       <CalendarComponent
//                         mode="single"
//                         selected={newCoupon?.validFrom}
//                         onSelect={date => setNewCoupon({...newCoupon, validFrom: date})}
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Valid Until</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" className="w-full">
//                         <Calendar className="mr-2 h-4 w-4" />
//                         {newCoupon?.validUntil ? format(newCoupon?.validUntil, "PPP") : "No expiry"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent>
//                       <CalendarComponent
//                         mode="single"
//                         selected={newCoupon?.validUntil}
//                         onSelect={date => setNewCoupon({...newCoupon, validUntil: date})}
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="border-t px-6 py-4">
//               <Button onClick={handleCreateCoupon}>Create Coupon</Button>
//             </CardFooter>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Active Coupons</CardTitle>
//               <CardDescription>Manage your current promotions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Code</TableHead>
//                     <TableHead>Discount</TableHead>
//                     <TableHead>Usage</TableHead>
//                     <TableHead>Valid Until</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {coupons?.map((coupon) => (
//                     <TableRow key={coupon?.id}>
//                       <TableCell className="font-medium">{coupon?.code}</TableCell>
//                       <TableCell>
//                         {coupon.discountType === "PERCENTAGE" ? (
//                           <span>{coupon?.discountValue}%</span>
//                         ) : (
//                           <span>${coupon?.discountValue}</span>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Progress 
//                           value={(coupon?.usageCount / (coupon?.usageLimit || 100)) * 100} 
//                           className="h-2"
//                         />
//                         <div className="text-xs text-muted-foreground mt-1">
//                           {coupon?.usageCount} / {coupon?.usageLimit || "∞"} uses
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         {coupon?.validUntil ? format(coupon?.validUntil, "PP") : "No expiry"}
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={coupon?.status === "ACTIVE" ? "default" : "destructive"}>
//                           {coupon?.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button variant="ghost" size="icon">
//                             <Copy className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon">
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
    
//     </div>
// };

// export default CouponManagement;
