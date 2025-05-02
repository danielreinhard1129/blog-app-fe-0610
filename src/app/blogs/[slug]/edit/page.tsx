import BlogEditPage from "@/features/blog/BlogEditPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const BlogEdit = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();

  if (!session) return redirect("/login");

  const slug = (await params).slug;

  return <BlogEditPage slug={slug} />;
};

export default BlogEdit;
