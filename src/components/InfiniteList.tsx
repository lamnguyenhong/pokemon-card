import { FC, useEffect, useRef } from "react";
import { InfiniteListProps } from "@app/types/InfiniteList.type";

export const InfiniteList: FC<InfiniteListProps> = ({
  loadMoreComponent,
  className,
  children,
  loadMore,
  indicatorHeight = 60,
  offsetThreshold = 100,
  useInnerScrollable = false,
  hasMore,
}) => {
  const isLoadMore = useRef<boolean>(false);
  const innerScrollable = useRef<HTMLDivElement>(null);
  const loaderSelector = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef(0);
  const loadMoreRef = useRef(loadMore);

  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  useEffect(() => {
    const element = useInnerScrollable ? innerScrollable.current : window;

    if (element) {
      element.addEventListener("scroll", onScroll);

      return () => {
        element.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  const onScroll = async (event: Event) => {
    const loaderNode = loaderSelector.current;

    if (!loaderNode) return null;

    let target;

    if (useInnerScrollable) {
      target = event.target as HTMLElement;
    } else if (document.documentElement.scrollTop) {
      target = document.documentElement;
    } else {
      target = document.body;
    }

    const clientHeight =
      target === document.body || target === document.documentElement
        ? window.screen.availHeight
        : target.clientHeight;

    const { y: scrollTop } = loaderNode.getBoundingClientRect();
    const scrollOffset = scrollTop - clientHeight - indicatorHeight;

    // Detect scroll up or down
    const isScrollDown = scrollOffset < currentOffsetRef.current;

    if (
      !isLoadMore.current &&
      isScrollDown &&
      Math.abs(scrollOffset) < offsetThreshold &&
      loadMoreRef.current &&
      hasMore
    ) {
      isLoadMore.current = true;
      await loadMoreRef.current();
      isLoadMore.current = false;
    }

    currentOffsetRef.current = scrollOffset;
  };

  return (
    <div ref={innerScrollable} className={className}>
      {children}

      {hasMore && (
        <div ref={loaderSelector}>
          {!!loadMoreComponent && loadMoreComponent()}
        </div>
      )}
    </div>
  );
};
