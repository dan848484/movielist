import { Skeleton } from "@mui/material";

export const ListElementSkelton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={"100%"}
      height={"48px"}
      className="mt-5 rounded-xl"
    ></Skeleton>
  );
};
