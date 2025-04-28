"use client";

import { axiosInstance } from "@/lib/axios";
import { Blog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";

const useGetBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Blog>(`/blogs/${slug}`);
      return data;
    },
    retry: false,
  });
};

export default useGetBlogBySlug;
