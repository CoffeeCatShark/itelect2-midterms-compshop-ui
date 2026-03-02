// staff/employee/EmployeeApp.jsx
// Top-level component for the employee role.
// Employees only see the Active Requests table.

import { useState } from "react";
import DashboardLayout     from "../shared/DashboardLayout";
import ActiveRequestsTable from "../shared/ActiveRequestsTable";

const EMPLOYEE_NAV = [
  { key: "active", label: "Active Requests", icon: "📋" },
];

export default function EmployeeApp({
  currentUser,
  onLogout,
  requests, setRequests,
  active,   setActive,
}) {
  const [activeTab, setActiveTab] = useState("active");

  const renderContent = () => {
    switch (activeTab) {
      case "active":
        return (
          <ActiveRequestsTable
            requests={requests} active={active}
            setRequests={setRequests} setActive={setActive}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      currentUser={currentUser}
      onLogout={onLogout}
      nav={EMPLOYEE_NAV}
      activeNav={activeTab}
      setActiveNav={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
