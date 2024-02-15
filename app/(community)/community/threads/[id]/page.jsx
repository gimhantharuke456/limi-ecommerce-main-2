import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import db from "@/lib/db";

export const revalidate = 0;

async function page({ params }) {
  if (!params.id) return null;

  const session = getServerSession(authOptions);
  const user = (await session).user;
  if (!user) return null;

  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children ?? []}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo.id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem) => (
          <ThreadCard
            key={childItem.id}
            id={childItem.id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
