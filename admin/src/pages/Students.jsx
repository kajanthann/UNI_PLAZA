import React from "react";

const Students = () => {
  // Dummy student data
  const students = [
    {
      _id: "1",
      name: "John Doe",
      regNo: "2021CSE123",
      email: "john.doe@gmail.com",
      phone: "0771234567",
      university: "University of Sri Jayewardenepura",
      year: "3rd Year",
      faculty: "Computing",
      department: "Software Engineering",
      image: "https://via.placeholder.com/80",
    },
    {
      _id: "2",
      name: "Jane Smith",
      regNo: "2021CSE456",
      email: "jane.smith@gmail.com",
      phone: "0712345678",
      university: "University of Colombo",
      year: "2nd Year",
      faculty: "Science",
      department: "Computer Science",
      image: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
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
                <td className="p-3">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{student.name}</td>
                <td className="p-3">{student.regNo}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.phone}</td>
                <td className="p-3">{student.university}</td>
                <td className="p-3">{student.faculty}</td>
                <td className="p-3">{student.department}</td>
                <td className="p-3">{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
