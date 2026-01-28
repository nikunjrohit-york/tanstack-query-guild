import { postData } from "@/lib/fetch-utils";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Comment, CommentsResponse } from "@/types";


const queryKey: QueryKey = ["comments"];

export function useCommentsQuery() {
  return useInfiniteQuery({
    queryKey,
    staleTime: Infinity, // Prevent background refetches causing list fluctuations
    queryFn: async ({ pageParam = 1 }) => {
      // Adapt for json-server which returns an array and uses _page/_limit
      const response = await fetch(
        `/api/comments?_page=${pageParam}&_limit=5&_sort=-createdAt`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      const totalCount = response.headers.get("X-Total-Count");

      return {
        comments: data,
        // If we got fewer items than limit, we've reached the end
        nextCursor: data.length === 5 ? (pageParam as number) + 1 : null,
        totalComments: totalCount ? parseInt(totalCount, 10) : 0,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newComment: { text: string }) => {
      // Simulate network delay (2000ms - 4000ms)
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 2000));

      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Simulated network error. Please try again.");
      }

      const commentWithUser = {
        ...newComment,
        user: {
          name: "User",
          avatar: "U",
        },
        createdAt: new Date().toISOString(),
      };
      return postData<Comment>("/api/comments", commentWithUser);
    },
    onSuccess: async (comment) => {
      // Update the query cache with the new comment so we don't have to wait for the refetch
      queryClient.setQueryData<
        InfiniteData<CommentsResponse, number | undefined>
      >(queryKey, (oldData) => {
        // Add the new comment to the first page of results
        const firstPage = oldData?.pages[0];

        if (firstPage) {
          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                totalComments: firstPage.totalComments + 1,
                comments: [comment, ...firstPage.comments],
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      });
    },

    // You can still invalidate the query afterwards but it's not really necessary
  });
}
