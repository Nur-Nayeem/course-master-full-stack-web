import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import PlayerHeader from "../../components/coursePlayerComponents/PlayerHeader";
import VideoPlayer from "../../components/coursePlayerComponents/VideoPlayer";
import LessonTabs from "../../components/coursePlayerComponents/LessonTabs";
import ProgressHeader from "../../components/coursePlayerComponents/ProgressHeader";
import LessonSidebar from "../../components/coursePlayerComponents/LessonSidebar";

export default function CoursePlayer() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [assignmentLink, setAssignmentLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cRes, meRes] = await Promise.all([
          axios.get(`/api/courses/${id}`),
          axiosSecure.get("/api/enrollments/me"),
        ]);

        setCourse(cRes.data.course || cRes.data);

        const myEnroll = meRes.data.enrollments.find(
          (e) => (e.courseId._id || e.courseId) === id
        );
        setEnrollment(myEnroll);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, axios, axiosSecure]);

  const handleMarkComplete = async (lessonIndex) => {
    if (!enrollment) return;
    try {
      const res = await axiosSecure.post(
        `/api/enrollments/${enrollment._id}/complete`,
        { lessonIndex }
      );
      setEnrollment((p) => ({
        ...p,
        progress: res.data.progress,
        lessonsCompleted: res.data.lessonsCompleted,
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Error marking complete");
    }
  };

  const handleSubmitQuiz = async () => {
    const lesson = course.lessons[selectedLesson];
    let score = 0;
    lesson.quiz.questions.forEach((q, i) => {
      if (q.options[q.correctAnswer] === quizAnswers[i]) score++;
    });
    console.log(score);

    try {
      const res = await axiosSecure.post(
        `/api/enrollments/${enrollment._id}/quiz`,
        { lessonIndex: selectedLesson, score }
      );
      console.log(res);

      setEnrollment((p) => ({ ...p, quizScores: res.data.quizScores }));
      alert(`Quiz submitted! Score: ${score}/${lesson.quiz.questions.length}`);
      setQuizAnswers({});
    } catch (err) {
      alert("Error submitting quiz", err);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!assignmentLink) return alert("Please provide a link");
    try {
      const res = await axiosSecure.post(
        `/api/enrollments/${enrollment._id}/assignment`,
        { lessonIndex: selectedLesson, driveLink: assignmentLink }
      );
      setEnrollment((p) => ({ ...p, assignments: res.data.assignments }));
      alert("Assignment submitted!");
      setAssignmentLink("");
    } catch (err) {
      alert("Error submitting assignment", err);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary/80" />
      </div>
    );

  if (!enrollment)
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-gray-800 space-y-4">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You need to enroll in this course to view the content.</p>
        <Link
          to={`/course/${id}`}
          className="px-6 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary"
        >
          Go to Course Page
        </Link>
      </div>
    );

  const currentLesson = course.lessons[selectedLesson];
  const isCompleted = enrollment.lessonsCompleted?.includes(selectedLesson);
  console.log(currentLesson?.videoUrl);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      {/* left side */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <PlayerHeader course={course} />

        <VideoPlayer
          videoUrl={currentLesson?.videoUrl}
          title={currentLesson?.title}
        />

        <LessonTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentLesson={currentLesson}
          isCompleted={isCompleted}
          onMarkComplete={() => handleMarkComplete(selectedLesson)}
          assignmentLink={assignmentLink}
          setAssignmentLink={setAssignmentLink}
          onSubmitAssignment={handleSubmitAssignment}
          submittedAssignment={
            enrollment.assignments?.find(
              (a) => a.lessonIndex === selectedLesson
            )?.driveLink
          }
          quizAnswers={quizAnswers}
          setQuizAnswers={setQuizAnswers}
          onSubmitQuiz={handleSubmitQuiz}
          currentQuizScore={
            enrollment.quizScores?.find((q) => q.lessonIndex === selectedLesson)
              ?.score
          }
        />
      </div>

      {/* right sidebar */}
      <aside className="w-full lg:mt-16 lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full">
        <ProgressHeader
          enrollment={enrollment}
          totalLessons={course.lessons.length}
        />
        <LessonSidebar
          lessons={course.lessons}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
          setActiveTab={setActiveTab}
          completedLessons={enrollment.lessonsCompleted || []}
        />
      </aside>
    </div>
  );
}
