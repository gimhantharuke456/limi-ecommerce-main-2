import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import db from "@/lib/db";

// Copy paste most of the code as it is from the /onboarding

async function Page() {
  const session = getServerSession(authOptions);
  const user = (await session).user;
  if (!user) return null;

  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  // if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
      <h1 className="text-heading2-bold text-light-1">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  );
}

export default Page;
