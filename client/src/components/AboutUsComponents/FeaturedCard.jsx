// Sub-component for the Feature Grid - Updated icon color
const FeatureCard = ({ Icon, title, detail }) => (
  <div className="flex p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition duration-300">
    <div className="shrink-0 pt-1">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <div className="ml-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{detail}</p>
    </div>
  </div>
);

export default FeatureCard;
