"use client";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

export default function AdminUserManagement() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("USER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const timeoutRef = useRef();

  // Fetch user list
  useEffect(() => {
    if (!session) return;
    fetch("/api/admin/users", {
      headers: { "x-user-role": session.user.role },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, [session]);

  // Edit user
  const handleEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name || "");
    setEditRole(user.role);
    setError("");
    setSuccess("");
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSuccess(""), 2500);
  };
  const showError = (msg) => {
    setError(msg);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setError(""), 2500);
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-user-role": session.user.role,
      },
      body: JSON.stringify({ id: editId, name: editName, role: editRole }),
    });
    if (res.ok) {
      showSuccess("User berhasil diupdate");
      setUsers(users.map(u => u.id === editId ? { ...u, name: editName, role: editRole } : u));
      setEditId(null);
    } else {
      showError("Gagal update user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus user ini?")) return;
    setError("");
    setSuccess("");
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-role": session.user.role,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showSuccess("User dihapus");
      setUsers(users.filter(u => u.id !== id));
    } else {
      showError("Gagal hapus user");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading data user...</div>;
  if (!session || session.user.role !== "ADMIN") return <div className="text-center text-red-500 mt-10">Unauthorized</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen User</h1>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 animate-pulse">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 animate-pulse">{success}</div>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editId === user.id ? (
              <tr key={user.id} className="bg-yellow-50">
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input input-bordered"
                  />
                </td>
                <td className="p-2 border">
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="input input-bordered"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="MODERATOR">MODERATOR</option>
                    <option value="USER">USER</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button className="btn btn-success btn-sm mr-2" onClick={handleUpdate}>
                    Simpan
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditId(null)}>
                    Batal
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="btn btn-error btn-sm" onClick={() => handleDelete(user.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}