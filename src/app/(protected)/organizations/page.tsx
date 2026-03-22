"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");

  const fetchOrgs = async () => {
    const res = await axios.get("/api/organizations");
    setOrgs(res.data);
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }

    try {
      await axios.post("/api/organizations", {
        name,
        industry,
        description,
      });

      toast.success("Organization created");

      setName("");
      setIndustry("");
      setDescription("");

      fetchOrgs();
    } catch (err) {
      toast.error("Error creating organization");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Organizations</h1>

      <div className="space-y-3 mb-6 ">
        <input
          className="border p-2 w-full rounded-md"
          placeholder="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded-md"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded-md"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Add Organization
        </button>
      </div>

      <div className="space-y-2">
        {orgs.map((org) => (
          <div key={org.id} className="border p-3 rounded-md">
            <p className="font-semibold">{org.name}</p>
            <p className="text-sm text-gray-500">{org.industry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}