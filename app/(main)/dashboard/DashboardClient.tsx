"use client";

import { useState, useTransition, useEffect, useRef, ChangeEvent } from "react";
import {
  createLink,
  updateLink,
  deleteLink,
  updateUserBio,
  getUserBio,
} from "./action";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/avatar";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import MainNavbar from "@/components/mainNavbar";

export default function DashboardClient({ links, userId, userName, bio }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState<
    null | { mode: "add" } | { mode: "edit"; item: any } | { mode: "bio" }
  >(null);

  const [user, setUser] = useState<any>(null);
  async function fetchBio() {
    const data = await getUserBio(userId);
    setUser(data);
  }
  // 🔄 ambil bio dari server
  useEffect(() => {
    fetchBio();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUser((prev: any) => ({ ...prev, image: url }));

    console.log("Selected file:", file.name);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUser((prev: any) => ({ ...prev, image: data.url }));

      console.log("Uploaded image URL:", data.url);
    } catch (error) {}
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (open?.mode === "add") {
        await createLink(formData, userId);
      } else if (open?.mode === "edit") {
        await updateLink(open.item.id, formData);
      } else if (open?.mode === "bio") {
        await updateUserBio(userId, formData);
        fetchBio();
      }
      setOpen(null);
      router.refresh();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Yakin mau hapus link ini?")) return;
    startTransition(async () => {
      await deleteLink(id);
      router.refresh();
    });
  };

  const handleShareLink = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const linksUrl = baseUrl + "/" + userName;
    navigator.clipboard.writeText(linksUrl);
    toast("Event has been created", {
      description: "url has been copied to the clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-10">
      <MainNavbar type="dashboard" />
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Header */}
        <Toaster richColors position="top-center" />

        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome,</p>

            <div className="flex flex-col gap-2 bg-gray-50 border rounded-lg mt-3 p-3 ">
              <div className="flex gap-2">
                {user?.image ? (
                  <Avatar src={user.image} />
                ) : (
                  <Avatar src={"/images/blank-avatar.webp"} />
                )}

                <span className="text-indigo-600 font-semibold my-auto">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
              >
                Edit Profile
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Bio Section */}
            <div className="mt-3 p-3 bg-gray-50 border rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Bio:</span>{" "}
                {user?.bio ? (
                  <span>{user.bio}</span>
                ) : (
                  <span className="text-gray-400 italic">Belum ada bio...</span>
                )}
              </p>
              <button
                onClick={() => setOpen({ mode: "bio" })}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
              >
                Edit Bio
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleShareLink}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Share my links
            </button>
            <button
              onClick={() => setOpen({ mode: "add" })}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add New
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Title</th>
                <th className="p-4">URL</th>
                <th className="p-4">Position</th>
                <th className="p-4">Visible</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((item: any, i: number) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-blue-600">{item.url}</td>
                  <td className="p-4">{item.position}</td>
                  <td className="p-4">{item.visible ? "✅" : "❌"}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setOpen({ mode: "edit", item })}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit/Bio */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {open.mode === "add"
                ? "Add New Link"
                : open.mode === "edit"
                ? "Edit Link"
                : "Edit Bio"}
            </h2>

            <form action={handleSubmit}>
              {open.mode === "bio" ? (
                <>
                  <textarea
                    name="bio"
                    placeholder="Tulis bio kamu di sini..."
                    defaultValue={bio || ""}
                    className="w-full mb-3 p-2 border rounded"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={open.mode === "edit" ? open.item.title : ""}
                    className="w-full mb-3 p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="url"
                    placeholder="URL"
                    defaultValue={open.mode === "edit" ? open.item.url : ""}
                    className="w-full mb-3 p-2 border rounded"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    defaultValue={
                      open.mode === "edit" ? open.item.description : ""
                    }
                    className="w-full mb-3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="position"
                    placeholder="Position"
                    defaultValue={
                      open.mode === "edit" ? open.item.position : ""
                    }
                    className="w-full mb-3 p-2 border rounded"
                  />
                  <label className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      name="visible"
                      value="true"
                      defaultChecked={
                        open.mode === "edit" ? open.item.visible : false
                      }
                    />
                    Visible
                  </label>
                </>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  {isPending
                    ? "Saving..."
                    : open.mode === "add"
                    ? "Save"
                    : open.mode === "edit"
                    ? "Update"
                    : "Save Bio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
