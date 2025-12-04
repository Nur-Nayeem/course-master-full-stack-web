import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import PlayerHeader from "../../components/coursePlayerComponents/PlayerHeader";
import VideoPlayer from "../../components/coursePlayerComponents/VideoPlayer";
export default function CoursePlayer() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [loading, setLoading] = useState(true);

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
      </div>
    </div>
  );
}
