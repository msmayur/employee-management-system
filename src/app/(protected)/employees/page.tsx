"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
import Filters from "@/components/Filters";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Table } from "lucide-react";


export default function EmployeesPage() {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/employees?page=${page}`);
      setEmployees(res.data.employees);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const handleSearch = async () => {
    setPage(1);
    if (!query) return fetchEmployees();

    const res = await axios.get(`/api/employees/search?query=${query}`);
    console.log(res.data);
    setEmployees(res.data);
  };

  const handleFilter = async (filters: any) => {
    setPage(1);
    try {
      // If no filters → fallback to normal list
      if (!filters.org && !filters.dept && !filters.status) {
        return fetchEmployees();
      }

      const params = new URLSearchParams();

      if (filters.org) params.append("org", filters.org);
      if (filters.dept) params.append("dept", filters.dept);
      if (filters.status) params.append("status", filters.status);

      const res = await axios.get(
        `/api/employees/filter?${params.toString()}`
      );

      setEmployees(res.data);
    } catch (error) {
      console.error("Filter error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Management
        </h1>

        {/* ================= ADD EMPLOYEE ================= */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Add Employee</h2>
            </div>

            <EmployeeForm refresh={fetchEmployees} />
          </CardContent>
        </Card>

        {/* ================= FILTER + SEARCH ================= */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Search & Filters</h2>
            </div>

            <Filters onFilter={handleFilter} />

            {/* Search */}
            <div className="flex gap-2">
              <Input
                placeholder="Search employees..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Button onClick={handleSearch}>
                Search
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* ================= EMPLOYEE TABLE ================= */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Employee List</h2>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading employees...</p>
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No employees found
              </div>
            ) : (
              <EmployeeTable data={employees} refresh={fetchEmployees} />
            )}

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </Button>

              <span className="text-gray-600">Page {page}</span>

              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}