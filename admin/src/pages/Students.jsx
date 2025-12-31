import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import Animation from "../Components/Animation";

const Students = () => {
  const { students, loadingStudents, fetchStudents } = useContext(AdminContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Helper: generate color based on string
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = '#' + 
      ((hash >> 24) & 0xFF).toString(16).padStart(2, '0') +
      ((hash >> 16) & 0xFF).toString(16).padStart(2, '0') +
      ((hash >> 8) & 0xFF).toString(16).padStart(2, '0');
    return color;
  };

  if (loadingStudents) {
    return <Animation />;
  }

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Students</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Reg No</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">University</th>
              <th className="p-3">Faculty</th>
              <th className="p-3">Department</th>
              <th className="p-3">Year</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{index + 1}</td>

                {/* Profile image or initials */}
                <td className="p-3">
                  {student.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${student.image}`}
                      alt={student.name || "N/A"}
                      className="w-10 h-10 rounded-full border border-gray-400 object-cover"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: stringToColor(student.name || "User") }}
                    >
                      {(student.name || "User")
                        .split(" ")
                        .map(n => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </td>

                <td className="p-3 font-medium">
                  {student.fullName || student.name || "N/A"}
                </td>
                <td className="p-3">{student.regNo || student.registrationNo || "N/A"}</td>
                <td className="p-3">{student.email || "N/A"}</td>
                <td className="p-3">{student.phone || "N/A"}</td>
                <td className="p-3">{student.university || "N/A"}</td>
                <td className="p-3">{student.faculty || "N/A"}</td>
                <td className="p-3">{student.department || "N/A"}</td>
                <td className="p-3">{student.year || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
