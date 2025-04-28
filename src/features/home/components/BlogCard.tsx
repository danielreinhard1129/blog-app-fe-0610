import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card>
        <CardHeader>
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
            <Image
              src={blog.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Badge
            variant="outline"
            className="rounded-sm bg-green-100 text-green-600 capitalize"
          >
            {blog.category}
          </Badge>
          <p className="mt-1 text-sm font-light">{blog.user?.name}</p>
          <h2 className="line-clamp-1 text-lg font-semibold">{blog.title}</h2>
          <p className="line-clamp-4">{blog.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
