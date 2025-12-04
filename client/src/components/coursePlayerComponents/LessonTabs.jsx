import { Tab } from "@headlessui/react";
import { FaFileAlt, FaClipboardList, FaTrophy } from "react-icons/fa";
import TabOverview from "./Tabs/TabOverview";
import TabAssignment from "./Tabs/TabAssignment";
import TabQuiz from "./Tabs/TabQuiz";

const LessonTabs = ({
  currentLesson,
  assignmentLink,
  setAssignmentLink,
  onSubmitAssignment,
  submittedAssignment,
  quizAnswers,
  setQuizAnswers,
  onSubmitQuiz,
  currentQuizScore,
}) => {
  const tabs = [
    { id: "overview", icon: FaFileAlt, label: "Overview" },
    { id: "assignment", icon: FaClipboardList, label: "Assignment" },
    { id: "quiz", icon: FaTrophy, label: "Quiz" },
  ];

  return (
    <div className="flex-1 bg-white">
      <Tab.Group>
        {/* Tab Buttons */}
        <Tab.List className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <Tab key={tab.id} className="focus:outline-none">
              {({ selected }) => (
                <button
                  className={`px-6 py-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon /> {tab.label}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        {/* Tab Panels */}
        <Tab.Panels className="p-6 md:p-8">
          {/* Overview */}
          <Tab.Panel>
            <TabOverview lesson={currentLesson} />
          </Tab.Panel>

          {/* Assignment */}
          <Tab.Panel>
            <TabAssignment
              link={assignmentLink}
              setLink={setAssignmentLink}
              onSubmit={onSubmitAssignment}
              submittedLink={submittedAssignment}
            />
          </Tab.Panel>

          {/* Quiz */}
          <Tab.Panel>
            <TabQuiz
              lesson={currentLesson}
              answers={quizAnswers}
              setAnswers={setQuizAnswers}
              onSubmit={onSubmitQuiz}
              previousScore={currentQuizScore}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default LessonTabs;
