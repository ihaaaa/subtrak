import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MoreHorizontal } from "lucide-react";

const subscriptions = [
  {
    name: "Netflix",
    cost: "₹649",
    nextBilling: "Dec 25, 2024",
    usageStatus: "high", // green
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Spotify",
    cost: "₹119",
    nextBilling: "Dec 30, 2024",
    usageStatus: "high",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amazon Prime",
    cost: "₹1,499",
    nextBilling: "Jan 15, 2025",
    usageStatus: "medium", // orange
    logo: "https://images.unsplash.com/photo-1662466767333-433cc73ebbb7?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jio Hotstar",
    cost: "₹899",
    nextBilling: "Jan 8, 2025",
    usageStatus: "low", // red
    logo: "https://static.vecteezy.com/system/resources/previews/056/505/637/non_2x/jiohotstar-app-icon-on-transparent-background-free-png.png",
  },
  {
    name: "Zomato Gold",
    cost: "₹149",
    nextBilling: "Dec 28, 2024",
    usageStatus: "high",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQeL8mQBREJm8wA-INLpRhs3dU3K2gJqEXMYAHMLo1R4cYdb4z-KAVlnA_pG_QMijnVE&usqp=CAU",
  },
  {
    name: "YouTube Premium",
    cost: "₹129",
    nextBilling: "Jan 5, 2025",
    usageStatus: "medium",
    logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function getUsageStatusColor(status: string) {
  switch (status) {
    case "high":
      return "bg-[#10B981]";
    case "medium":
      return "bg-[#F59E0B]";
    case "low":
      return "bg-[#EF4444]";
    default:
      return "bg-gray-400";
  }
}

export function SubscriptionsTable() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">Your Subscriptions</h2>
        <button className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Service</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Cost</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Next Billing</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Usage</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <tr key={index} className="border-b border-[#334155] last:border-b-0 hover:bg-[#334155]/30 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#334155] flex items-center justify-center">
                      <ImageWithFallback
                        src={subscription.logo}
                        alt={subscription.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white font-medium">{subscription.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-white font-medium">{subscription.cost}</span>
                </td>
                <td className="py-4">
                  <span className="text-gray-300">{subscription.nextBilling}</span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getUsageStatusColor(subscription.usageStatus)}`}></div>
                    <span className="text-gray-300 capitalize">{subscription.usageStatus}</span>
                  </div>
                </td>
                <td className="py-4">
                  <button className="p-2 hover:bg-[#475569] rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}