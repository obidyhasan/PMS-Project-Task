import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="min-h-svh">
      <nav className="flex items-center text-sm justify-center gap-8 border-b flex-wrap p-4 underline">
        <Link className="" to={"/"}>
          Employee Performance
        </Link>
        <Link to={"/manage-employee"}>Manage Employee Salary</Link>
        <Link to={"/attendance"}>Attendance</Link>
        <Link to={"/attendance-report"}>Attendance Reports</Link>
        <Link to={"/new-award"}>New Award</Link>
        <Link to={"/weekly-holiday"}>Weekly Holiday</Link>
        <Link to={"/holiday"}>Holiday</Link>
        <Link to={"/leave-type"}>Add Leave Type</Link>
        <Link to={"/leave-application"}>Leave Application</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
