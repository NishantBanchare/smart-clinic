import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("admin_token");

      if (!token) {
        throw new Error("Admin authentication required.");
      }

     const headers = {
  Authorization: `Bearer ${token}`,
};

console.log("🔐 Admin token exists:", !!token);
console.log("📤 Sending headers:", headers);

const response = await fetch(
  "http://localhost:5000/api/appointments",
  {
    method: "GET",
    headers,
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch appointments."
        );
      }

      setAppointments(data.appointments || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load appointments when dashboard opens
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Update appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      setError("");

      const token = localStorage.getItem("admin_token");

      if (!token) {
        throw new Error("Admin authentication required.");
      }

      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update appointment."
        );
      }

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment._id === id
            ? data.appointment
            : appointment
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Statistics
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  return (
    <div className="admin-page">

      {/* Header */}
      <header className="admin-header">
        <div>
          <span className="admin-label">
            SMART CLINIC
          </span>

          <h1>Admin Dashboard</h1>

          <p>Manage patient appointments</p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchAppointments}
          disabled={loading}
        >
          ↻ {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {/* Statistics */}
      <section className="admin-stats">

        <div className="stat-card">
          <span>Total Appointments</span>
          <strong>{appointments.length}</strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="stat-card">
          <span>Confirmed</span>
          <strong>{confirmedCount}</strong>
        </div>

      </section>

      {/* Appointments */}
      <section className="appointments-section">

        <div className="section-top">
          <div>
            <h2>Appointments</h2>

            <p>
              Recent patient appointment requests
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="message-box">
            Loading appointments...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="message-box error">
            {error}
          </div>
        )}

        {/* No appointments */}
        {!loading &&
          !error &&
          appointments.length === 0 && (
            <div className="message-box">
              No appointments found.
            </div>
          )}

        {/* Appointment table */}
        {!loading &&
          !error &&
          appointments.length > 0 && (
            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Concern</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {appointments.map((appointment) => (

                    <tr key={appointment._id}>

                      {/* Patient */}
                      <td>
                        <strong>
                          {appointment.name}
                        </strong>
                      </td>

                      {/* Phone */}
                      <td>
                        {appointment.phone}
                      </td>

                      {/* Age */}
                      <td>
                        {appointment.age}
                      </td>

                      {/* Concern */}
                      <td>
                        {appointment.concern}
                      </td>

                      {/* Date */}
                      <td>
                        {appointment.date}
                      </td>

                      {/* Time */}
                      <td>
                        {appointment.time}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`status-badge status-${appointment.status.toLowerCase()}`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>

                        <div className="action-buttons">

                          {/* Pending */}
                          {appointment.status === "Pending" && (
                            <>
                              <button
                                className="action-button confirm"
                                disabled={
                                  updatingId === appointment._id
                                }
                                onClick={() =>
                                  updateStatus(
                                    appointment._id,
                                    "Confirmed"
                                  )
                                }
                              >
                                Confirm
                              </button>

                              <button
                                className="action-button cancel"
                                disabled={
                                  updatingId === appointment._id
                                }
                                onClick={() =>
                                  updateStatus(
                                    appointment._id,
                                    "Cancelled"
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {/* Confirmed */}
                          {appointment.status === "Confirmed" && (
                            <>
                              <button
                                className="action-button complete"
                                disabled={
                                  updatingId === appointment._id
                                }
                                onClick={() =>
                                  updateStatus(
                                    appointment._id,
                                    "Completed"
                                  )
                                }
                              >
                                Complete
                              </button>

                              <button
                                className="action-button cancel"
                                disabled={
                                  updatingId === appointment._id
                                }
                                onClick={() =>
                                  updateStatus(
                                    appointment._id,
                                    "Cancelled"
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {/* Completed */}
                          {appointment.status === "Completed" && (
                            <span className="finished-text">
                              Completed
                            </span>
                          )}

                          {/* Cancelled */}
                          {appointment.status === "Cancelled" && (
                            <span className="finished-text">
                              Cancelled
                            </span>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

      </section>

    </div>
  );
}

export default Admin;