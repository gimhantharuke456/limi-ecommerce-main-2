"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

function UserCard({ id, name, username, imgUrl, personType }) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
      <div className="lex flex-1 items-start justify-start gap-3 xs:items-center">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="h-auto min-w-[74px] rounded-lg bg-primary-500 text-[12px] text-light-1 !important"
        onClick={() => {
          if (isCommunity) {
            router.push(`/community/communities/${id}`);
          } else {
            router.push(`/community/profile/${id}`);
          }
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
