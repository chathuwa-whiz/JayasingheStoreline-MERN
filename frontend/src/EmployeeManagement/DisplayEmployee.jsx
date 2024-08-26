import React, { useState, useEffect } from 'react';


export default function OrdersByProduct() {

  return (
    <div className="rounded-lg p-8">
      <table className="min-w-full overflow-y-auto min-h-full border rounded-lg bg-white">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Employee ID</th>
            <th className="py-2 px-4 text-left">Full Name</th>
            <th className="py-2 px-4 text-left">Date of Birth</th>
            <th className="py-2 px-4 text-left">Gender</th>
            <th className="py-2 px-4 text-left">Contact Number</th>
            <th className="py-2 px-4 text-left">E-mail</th>
            <th className="py-2 px-4 text-left">Residancial Address</th>
            <th className="py-2 px-4 text-left">Job Title</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Basic Salary</th>
            <th className="py-2 px-4 text-left">Date of Join</th>
            <th className="py-2 px-4 text-left">Bank Details</th>
            <th className="py-2 px-4 text-left">Emergency Contact</th>
            <th className="py-2 px-4 text-left">Skills</th>
            <th className="py-2 px-4 text-left">Notes</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
