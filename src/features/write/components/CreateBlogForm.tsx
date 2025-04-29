"use client";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateBlogSchema } from "../schemas";

const CreateBlogForm = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      thumbnail: null,
    },
    validationSchema: CreateBlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.title && !!formik.errors.title && (
          <p className="text-xs text-red-500">{formik.errors.title}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          type="text"
          placeholder="Category"
          required
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.category && !!formik.errors.category && (
          <p className="text-xs text-red-500">{formik.errors.category}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ resize: "none" }}
        />
        {!!formik.touched.description && !!formik.errors.description && (
          <p className="text-xs text-red-500">{formik.errors.description}</p>
        )}
      </div>

      <TiptapRichtextEditor
        label="Content"
        field="content"
        isTouch={formik.touched.content}
        content={formik.values.content}
        onChange={(value: string) => formik.setFieldValue("content", value)}
        setError={formik.setFieldError}
        setTouch={formik.setFieldTouched}
      />

      {selectedImage ? (
        <div className="relative h-[150px] w-[200px]">
          <Image
            src={selectedImage}
            alt="thumbnail"
            className="object-cover"
            fill
          />
          <Button
            className="absolute -top-2 -right-2 rounded-full"
            size="icon"
            variant="destructive"
            type="button"
            onClick={removeThumbnail}
          >
            <Trash2 />
          </Button>
        </div>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
          {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
            <p className="text-xs text-red-500">{formik.errors.thumbnail}</p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button className="my-10" type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
