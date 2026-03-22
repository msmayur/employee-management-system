"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Save, X } from "lucide-react";

export default function EditEmployeeModal({
    employee,
    onClose,
    refresh,
}: any) {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: employee,
    });

    const onSubmit = async (data: any) => {
        try {
            const cleanData = {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                position: data.position,
                department: data.department,
                joiningDate: data.joiningDate,
                salary: data.salary,
                status: data.status,
                organizationId: data.organizationId,
            };

            await axios.put(`/api/employees/${employee.id}`, cleanData);

            toast.success("Employee updated");
            refresh();
            onClose();
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Update employee details and save changes.
                </DialogDescription>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-4"
                >
                    <Input placeholder="Full Name" {...register("fullName")} />
                    <Input placeholder="Email" {...register("email")} />
                    <Input placeholder="Phone" {...register("phone")} />
                    <Input placeholder="Position" {...register("position")} />
                    <Input placeholder="Department" {...register("department")} />

                    <Input type="date" {...register("joiningDate")} />

                    <Input
                        type="number"
                        placeholder="Salary"
                        {...register("salary", { valueAsNumber: true })}
                    />

                    {/* Status Select */}
                    <Select
                        defaultValue={employee.status}
                        onValueChange={(val) => setValue("status", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="z-50 bg-white border shadow-lg">
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                        </Button>

                        <Button type="submit">
                            <Save className="w-4 h-4 mr-1" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}