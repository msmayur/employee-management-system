"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filters({ onFilter }: any) {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [org, setOrg] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get("/api/organizations").then((res) => setOrgs(res.data));
  }, []);

  const applyFilters = () => {
    onFilter({ org, dept, status });
  };

  const resetFilters = () => {
    setOrg("");
    setDept("");
    setStatus("");
    onFilter({}); // reset
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
  <Select onValueChange={(val) => setOrg(val)}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Organization" />
    </SelectTrigger>
    <SelectContent position="popper" className="z-50 bg-white border shadow-lg">
      {orgs.map((o) => (
        <SelectItem key={o.id} value={o.id}>
          {o.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Input
    placeholder="Department"
    value={dept}
    onChange={(e) => setDept(e.target.value)}
  />

  <Select onValueChange={(val) => setStatus(val)}>
    <SelectTrigger className="w-[160px]">
      <SelectValue placeholder="Status" />
    </SelectTrigger>
    <SelectContent position="popper" className="z-50 bg-white border shadow-lg">
      <SelectItem value="ACTIVE">Active</SelectItem>
      <SelectItem value="INACTIVE">Inactive</SelectItem>
    </SelectContent>
  </Select>

  <Button onClick={applyFilters}>Apply</Button>
  <Button variant="secondary" onClick={resetFilters}>
    Reset
  </Button>
</div>
  );
}