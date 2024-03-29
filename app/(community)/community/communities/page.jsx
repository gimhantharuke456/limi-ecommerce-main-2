import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";
import db from "@/lib/db";
import CreateCommunityForm from "@/components/community/CreateCommunityForm";

async function Page({ searchParams }) {
  const session = getServerSession(authOptions);
  const user = (await session).user;
  if (!user) return null;

  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  // if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <div className="flex flex-row justify-between">
        {" "}
        <h1 className="text-heading2-bold text-light-1">Communities</h1>
      </div>

      <div className="mt-5">
        <Searchbar routeType="community/communities" />
      </div>

      <section className="mt-9 flex flex-wrap gap-4">
        {result.communities.length === 0 ? (
          <p className="text-center !text-base-regular text-light-3">
            No Result
          </p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="community/communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
      <CreateCommunityForm user={user} />
    </>
  );
}

export default Page;
