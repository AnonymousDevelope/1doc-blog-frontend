import { Link } from "@/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogList from "./_components/blog-list";
import { cookies } from "next/headers";
import { verifyToken } from "@/api/services/authService";

export default async function page() {
  const token = (await cookies()).get("token")?.value as string;
  console.log(token);
  const verifyCheck = await verifyToken(token);
  console.log(verifyCheck); 
  if (!verifyCheck) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-500">Access Denied</h2>
          <p className="text-gray-500">You must be logged in as an admin to view this page.</p>
          <Link href="/admin-login" >
            <Button variant="outline">Go to Admin Login</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/dashboard/blogs/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Blog
          </Button>
        </Link>
      </div>
      <BlogList />
    </div>
  );
}

