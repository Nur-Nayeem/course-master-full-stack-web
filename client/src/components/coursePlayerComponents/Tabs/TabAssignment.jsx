import { FaCheckCircle } from "react-icons/fa";

const TabAssignment = ({ link, setLink, onSubmit, submittedLink }) => {
  return (
    <div className="space-y-6 max-w-xl animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-secondary mb-2">
          Submit Assignment
        </h3>
        <p className="text-gray-500 text-sm">
          Upload your work to Google Drive and paste the shareable link below.
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="url"
          placeholder="https://drive.google.com/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition"
        />
        <button
          onClick={onSubmit}
          className="w-full py-3 bg-primary/90 text-white rounded-lg font-semibold hover:bg-primary transition"
        >
          Submit Assignment
        </button>
      </div>

      {submittedLink && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <FaCheckCircle className="text-green-600 mt-1" />
          <div>
            <p className="font-semibold text-green-800">Assignment Submitted</p>
            <a
              href={submittedLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-green-600 hover:underline break-all"
            >
              {submittedLink}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabAssignment;
