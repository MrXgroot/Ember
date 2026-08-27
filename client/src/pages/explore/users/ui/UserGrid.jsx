import React from "react";
import { UserCard } from "./UserCard";

export function UserGrid({ users = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {users.map((user) => (
        <UserCard key={user._id || user.id} user={user} />
      ))}
    </div>
  );
}

export default UserGrid;
