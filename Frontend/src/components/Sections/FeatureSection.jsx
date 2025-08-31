import { Truck, RotateCw, CreditCard, Gift, Headphones } from "lucide-react";

const services = [
  {
    icon: <Truck size={40} />,
    title: "Free Shipping",
    description: "For all Orders Over $100",
  },
  {
    icon: <RotateCw size={40} />,
    title: "30 Days Returns",
    description: "For an Exchange Product",
  },
  {
    icon: <CreditCard size={40} />,
    title: "Secured Payment",
    description: "Payment Cards Accepted",
  },
  {
    icon: <Gift size={40} />,
    title: "Special Gifts",
    description: "Our First Product Order",
  },
  {
    icon: <Headphones size={40} />,
    title: "Support 24/7",
    description: "Contact us Anytime",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-gray-100 py-16 border-t border-gray-300 ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-gray-700">{service.icon}</div>
            <h3 className="font-semibold text-lg mt-2">{service.title}</h3>
            <p className="text-gray-500 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
