// staff/admin/AdminApp.jsx
// Top-level component for the admin role.
// Owns the sidebar navigation config and renders the correct page view.

import { useState } from "react";
import DashboardLayout   from "../shared/DashboardLayout";
import AdminDashboard    from "./AdminDashboard";
import ManageRoles       from "./ManageRoles";
import DeleteEmployee    from "./DeleteEmployee";
import ServiceManagement from "./ServiceManagement";
import ActiveRequestsTable   from "../shared/ActiveRequestsTable";
import RequestTableDisplay   from "../shared/RequestTableDisplay";

const ADMIN_NAV = [
  { key: "dashboard",  label: "Dashboard Overview",     icon: "🏠" },
  { key: "roles",      label: "Manage User Roles",       icon: "🛡️" },
  { key: "delete_emp", label: "Delete Employee",         icon: "👤" },
  { key: "active",     label: "Active Table Display",    icon: "📊" },
  { key: "requests",   label: "Request Table Display",   icon: "📋" },
  { key: "services",   label: "Service Management",      icon: "⚙️" },
];

export default function AdminApp({
  currentUser,
  onLogout,
  users, setUsers,
  services, setServices,
  requests, setRequests,
  active, setActive,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <AdminDashboard
            users={users} services={services}
            requests={requests} active={active}
          />
        );
      case "roles":
        return <ManageRoles users={users} setUsers={setUsers} currentUser={currentUser} />;
      case "delete_emp":
        return <DeleteEmployee users={users} setUsers={setUsers} currentUser={currentUser} />;
      case "active":
        return (
          <ActiveRequestsTable
            requests={requests} active={active}
            setRequests={setRequests} setActive={setActive}
          />
        );
      case "requests":
        return (
          <RequestTableDisplay
            requests={requests} active={active}
            setRequests={setRequests} setActive={setActive}
          />
        );
      case "services":
        return <ServiceManagement services={services} setServices={setServices} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      currentUser={currentUser}
      onLogout={onLogout}
      nav={ADMIN_NAV}
      activeNav={activeTab}
      setActiveNav={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
