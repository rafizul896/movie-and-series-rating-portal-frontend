import ManageOrderHistory from "@/components/modules/adminDashboard/order/OrderHistory";


export default async function OrderHistory() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold mb-6">Order History Management</h1>
      <ManageOrderHistory/>
    </div>
  );
}