export interface Step {
  title: string;
  description: string;
  icon: string;
}

export interface Perk {
  label: string;
}

export const steps: Step[] = [
  {
    title: "Choose Event",
    description: "Browse movies and events available near you.",
    icon: "🎟️",
  },
  {
    title: "Select Seats",
    description: "Pick your preferred seats with live availability.",
    icon: "🪑",
  },
  {
    title: "Make Payment",
    description: "Pay securely using trusted payment methods.",
    icon: "💳",
  },
  {
    title: "Get Confirmed",
    description: "Receive instant confirmation after booking.",
    icon: "✅",
  },
];

export const perks: Perk[] = [
  { label: "Instant Confirmation" },
  { label: "Live Booking" },
  { label: "Secure Payments" },
  { label: "Verified Events" },
];
