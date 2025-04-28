import { BlogInput } from "@/types/blog";

const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];

export async function createBlog(blog: BlogInput) {
  const res = await fetch(`http://localhost:5000/api/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return res.json();
}

export async function updateBlog(id: string, blog: BlogInput) {
  const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    throw new Error("Failed to update blog");
  }

  return res.json();
}

export async function deleteBlog(id: string) {
  const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }

  return res.json();
}

export async function getBlogs() {
  const res = await fetch(`http://localhost:5000/api/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}
