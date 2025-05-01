"use client";

import useAxios from "@/hooks/useAxios";
import { Blog } from "@/types/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload extends Omit<Blog, "thumbnail"> {
  thumbnail: File | null;
}

const useUpdateBlog = (id?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const { title, category, content, description, thumbnail } = payload;

      const updateBlogForm = new FormData();

      if (title) updateBlogForm.append("title", title);
      if (category) updateBlogForm.append("category", category);
      if (content) updateBlogForm.append("content", content);
      if (description) updateBlogForm.append("description", description);
      if (thumbnail) updateBlogForm.append("thumbnail", thumbnail);

      if (id) {
        const { data } = await axiosInstance.patch(
          `/blogs/${id}`,
          updateBlogForm,
        );
        return data;
      }
    },
    onSuccess: async () => {
      toast.success("Update blog success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateBlog;
