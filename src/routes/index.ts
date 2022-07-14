import { Home } from "@app/pages/Home";
import { FC } from "react";

type Route = {
  path: string;
  component: FC;
};

const routes: Route[] = [{ path: "/", component: Home }];

export default routes;
