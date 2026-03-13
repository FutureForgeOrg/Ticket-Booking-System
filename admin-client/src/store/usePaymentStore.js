import { create } from "zustand";
import { getAllPaymentsAdmin, getPaymentDetailsAdmin, refundPaymentAdmin } from "../services/payment.service.js"

const usePaymentStore = create((set, get) => ({
  payments: [],
  total: 0,
  page: 1,
  totalPages: 1,
  paymentDetails: null,
  loading: false,
  filters: {},

  setPage: (page) => set({ page }),

  setFilters: (filters) => set({ filters, page: 1 }),

  // ==============================
  // Fetch All Payments
  // ==============================
  fetchPayments: async () => {
    set({ loading: true });

    try {
      const { page, filters } = get();

      const data = await getAllPaymentsAdmin({
        page,
        ...filters,
      });

      set({
        payments: data.payments,
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  // ==============================
  // Fetch Single Payment
  // ==============================
  fetchPaymentDetails: async (id) => {
    set({ loading: true });

    try {
      const data = await getPaymentDetailsAdmin(id);

      set({
        paymentDetails: data.payment,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  // ==============================
  // Refund Payment
  // ==============================
  refundPayment: async (paymentId) => {
    try {
      const success = await refundPaymentAdmin(paymentId);

      if (success) {
        get().fetchPayments(); // 🔥 Refresh list after refund
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
}));

export default usePaymentStore;