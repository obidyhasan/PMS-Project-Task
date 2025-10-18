import EmployeeSalaryTable from "../../Components/Employee/EmployeeSalaryTable";

const ManageEmployeeSalary = () => {
  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="border-b pb-4">
        <h1 className="font-medium text-xl">Employee Payment</h1>
      </div>

      {/* Show Data Section */}
      <div>
        <EmployeeSalaryTable />
      </div>
    </div>
  );
};

export default ManageEmployeeSalary;
