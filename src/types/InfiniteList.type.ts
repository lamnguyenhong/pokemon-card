import { ReactNode } from "react";

export type InfiniteListProps = {
  loadMoreComponent?: () => JSX.Element;
  className: string;
  children?: JSX.Element | ReactNode;
  useInnerScrollable?: boolean;
  indicatorHeight?: number;
  offsetThreshold?: number;
  loadMore(): void;
  hasMore: boolean;
};
