"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";

async function PostThread({ userId, communities }) {
  const router = useRouter();
  const pathname = usePathname();
  const [fetchedCommunities, setFetchCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const form = useForm({
    // resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values) => {
    try {
      if (selectedCommunity) {
        await createThread({
          text: values.thread,
          author: userId,
          communityId: selectedCommunity,
          path: pathname,
        });
      } else {
        toast.error(`Please select a community`);
      }

      router.push("/community");
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  useEffect(() => {
    const fetchCommunitiesDetails = async () => {
      const communityDetailsPromises = communities.map(async (community) => {
        const comm = await fetchCommunityDetails(community);
        return { id: comm._id, name: comm.name, username: comm.username };
      });

      const communitiesDetails = await Promise.all(communityDetailsPromises);
      setFetchCommunities(communitiesDetails);
    };

    fetchCommunitiesDetails();
  }, [communities]);

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-3">
          <label
            htmlFor="community"
            className="text-base-semibold text-light-2"
          >
            Select Community
          </label>
          <select
            id="community"
            className="border border-dark-4 bg-dark-3 text-light-1 p-2"
            onChange={(e) => setSelectedCommunity(e.target.value)}
          >
            <option value="" disabled selected>
              Choose a community
            </option>
            {fetchedCommunities?.map(async (community) => {
              return (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              );
            })}
          </select>
        </div>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
