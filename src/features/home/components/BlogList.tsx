"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: blogs, isPending } = useGetBlogs({
    search: debounceSearch,
    page,
    take: 3,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto mt-10 max-w-xl"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}

      {!isPending && !blogs?.data.length && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>No Data</h2>
        </div>
      )}

      {!!blogs && !!blogs.data.length && (
        <div className="space-y-8">
          <section className="mt-10 grid gap-8 md:grid-cols-3">
            {blogs.data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
          <PaginationSection
            page={blogs.meta.page}
            take={blogs.meta.take}
            total={blogs.meta.total}
            onChangePage={onChangePage}
          />
        </div>
      )}
    </>
  );
};

export default BlogList;
