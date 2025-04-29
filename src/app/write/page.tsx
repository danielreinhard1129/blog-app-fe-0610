import WritePage from "@/features/write";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Write = async () => {
  const session = await auth();

  if (!session) return redirect("/login");

  return <WritePage />;
};

export default Write;
