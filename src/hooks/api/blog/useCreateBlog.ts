"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateBlogPayload {
  title: string;
  category: string;
  description: string;
  thumbnail: File | null;
  content: string;
}

const useCreateBlog = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      const createBlogForm = new FormData();

      createBlogForm.append("title", payload.title);
      createBlogForm.append("description", payload.description);
      createBlogForm.append("category", payload.category);
      createBlogForm.append("content", payload.content);
      createBlogForm.append("thumbnail", payload.thumbnail!);

      const { data } = await axiosInstance.post("/blogs", createBlogForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create blog success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
