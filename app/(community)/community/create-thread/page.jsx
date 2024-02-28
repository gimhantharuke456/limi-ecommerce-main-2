import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import db from "@/lib/db";

async function Page() {
  const session = getServerSession(authOptions);
  const user = (await session).user;
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="text-heading2-bold text-light-1">Create Thread</h1>

      <PostThread userId={user.id} communities={userInfo.communities} />
    </>
  );
}

export default Page;
