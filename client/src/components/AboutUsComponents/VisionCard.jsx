// Sub-component for the Vision Section - Updated border color
const VisionCard = ({ Icon, title, description, color }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg border-t-4 border-primary hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
    <Icon className={`w-10 h-10 mx-auto mb-4 ${color}`} />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

export default VisionCard;
