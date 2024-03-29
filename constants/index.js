export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/community",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/community/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/community/activity",
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/community/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/community/communities",
    label: "Communities",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/community/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
