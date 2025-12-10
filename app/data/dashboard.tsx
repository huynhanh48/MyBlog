// import ImageDashboard from "../components/dashboard/Image";
import PostsDashboard from "../components/dashboard/Posts";

export const navDashboard = [
  {
    id: 1,
    title: "Post",
    href: "/dashboard?id=post",
    component: <PostsDashboard />,
  },
  {
    id: 2,
    title: "Imgae",
    href: "/dashboard?id=image",
    component: null,
  },
];
