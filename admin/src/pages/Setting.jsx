import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const Setting = () => {
  const { adminData } = useContext(AdminContext);

  if (!adminData) return <p>No admin data available.</p>;

  const admins = Array.isArray(adminData) ? adminData : [adminData];

  // Flatten login history
  const tableRows = admins.flatMap(admin =>
    (admin.loginHistory || []).map(entry => ({
      name: admin.name,
      isVerified: admin.isVerified,
      time: entry.time,
      ipAddress: entry.ipAddress,
      deviceInfo: entry.deviceInfo,
    }))
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Admins Login History</h2>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Admin Name</th>
            <th className="border border-gray-300 px-2 py-1">Verified</th>
            <th className="border border-gray-300 px-2 py-1">Time</th>
            <th className="border border-gray-300 px-2 py-1">IP Address</th>
            <th className="border border-gray-300 px-2 py-1">Device Info</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.length > 0 ? (
            tableRows.map((row, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 px-2 py-1">{row.name}</td>
                <td className="border border-gray-300 px-2 py-1">{row.isVerified ? "Yes" : "No"}</td>
                <td className="border border-gray-300 px-2 py-1">{new Date(row.time).toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-1">{row.ipAddress || "N/A"}</td>
                <td className="border border-gray-300 px-2 py-1">{row.deviceInfo || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 px-2 py-1 text-center" colSpan={5}>
                No login history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Setting;
