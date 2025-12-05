import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CourseForm from "./CourseForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSimple from "../../components/Loading/LoadingSimple";

export default function AdminCourseEdit() {
  const { id } = useParams();
  const api = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/admin/courses/${id}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, api]);

  if (loading) {
    return <LoadingSimple />;
  }

  if (!course) {
    return (
      <div className="text-center py-10 text-red-600 text-lg">
        Course not found.
      </div>
    );
  }

  return <CourseForm initialData={course} isEditMode={true} />;
}
