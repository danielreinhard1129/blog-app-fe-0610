"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import useGetBlogBySlug from "@/hooks/api/blog/useGetBlogBySlug";
import { FC } from "react";
import BlogDetailBody from "./components/BlogDetailBody";
import BlogDetailHeader from "./components/BlogDetailHeader";

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage: FC<BlogDetailPageProps> = ({ slug }) => {
  const { data: blog, isPending } = useGetBlogBySlug(slug);

  if (isPending) {
    return <Loading />;
  }

  if (!blog) {
    return <NoData />;
  }

  return (
    <main className="container mx-auto max-w-6xl px-4">
      <BlogDetailHeader blog={blog} />
      <BlogDetailBody blog={blog} />
    </main>
  );
};

export default BlogDetailPage;
