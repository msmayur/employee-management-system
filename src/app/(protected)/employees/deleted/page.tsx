"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

export default function DeletedEmployeesPage() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDeleted = async () => {
        try {
            const res = await axios.get("/api/employees/deleted");
            setEmployees(res.data);
        } catch {
            console.error("Error fetching deleted employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeleted();
    }, []);

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">
                    Deleted Employees
                </h1>

                <Card>
                    <CardContent className="p-6">

                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading...
                            </p>
                        ) : employees.length === 0 ? (
                            <p className="text-center text-gray-400">
                                No deleted employees
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {employees.map((emp) => (
                                    <div
                                        key={emp.id}
                                        className="flex justify-between items-center border p-3 rounded-lg bg-white"
                                    >
                                        <div>
                                            <p className="font-medium">{emp.fullName}</p>
                                            <p className="text-sm text-gray-500">
                                                {emp.email} • {emp.department} •
                                            </p>
                                        </div>

                                        {/* Optional restore button */}
                                        <Button
                                            variant="outline"
                                            onClick={async () => {
                                                try {
                                                    await axios.patch(`/api/employees/restore/${emp.id}`);
                                                    toast.success("Employee restored");
                                                    fetchDeleted();
                                                } catch {
                                                    toast.error("Restore failed");
                                                }
                                            }}
                                        >
                                            <RotateCcw className="w-4 h-4 mr-1" />
                                            Restore
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}