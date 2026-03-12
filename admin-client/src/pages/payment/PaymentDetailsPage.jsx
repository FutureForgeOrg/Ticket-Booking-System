import { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePaymentStore from "../../store/usePaymentStore.js";

export default function PaymentDetailsPage() {
  const { id } = useParams();

  const {
    paymentDetails,
    fetchPaymentDetails,
    loading,
  } = usePaymentStore();

  useEffect(() => {
    if (id) {
      fetchPaymentDetails(id);
    }
  }, [id]);

  if (loading || !paymentDetails)
    return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payment Details</h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <p><strong>User:</strong> {paymentDetails.user?.name}</p>
        <p><strong>Email:</strong> {paymentDetails.user?.email}</p>
        <p><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
        <p><strong>Status:</strong> {paymentDetails.status}</p>
        <p><strong>Method:</strong> {paymentDetails.paymentMethod}</p>
        <p><strong>Razorpay Order ID:</strong> {paymentDetails.razorpayOrderId}</p>
        <p><strong>Razorpay Payment ID:</strong> {paymentDetails.razorpayPaymentId}</p>
        <p><strong>Paid At:</strong> {new Date(paymentDetails.paidAt).toLocaleString()}</p>
      </div>
    </div>
  );
}