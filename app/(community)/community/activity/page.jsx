import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import db from "@/lib/db";

async function Page() {
  const session = getServerSession(authOptions);
  const user = (await session).user;
  console.log(`===== ${user.id}`);
  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  // if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="text-heading2-bold text-light-1">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4">
                  <Image
                    src={activity.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;
