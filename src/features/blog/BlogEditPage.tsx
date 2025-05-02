import { FC } from "react";
import EditBlogForm from "./components/EditBlogForm";

interface BlogEditPageProps {
  slug: string;
}

const BlogEditPage: FC<BlogEditPageProps> = ({ slug }) => {
  return (
    <main className="container mx-auto px-4">
      <EditBlogForm slug={slug} />
    </main>
  );
};

export default BlogEditPage;
