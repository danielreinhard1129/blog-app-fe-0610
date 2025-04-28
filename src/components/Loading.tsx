import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <section className="flex h-[50vh] items-center justify-center">
      <Loader className="size-8 animate-spin" />
    </section>
  );
};

export default Loading;
