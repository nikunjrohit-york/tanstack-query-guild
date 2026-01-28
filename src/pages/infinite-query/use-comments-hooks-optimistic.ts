import { postData } from "@/lib/fetch-utils";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Comment, CommentsResponse } from "@/types";


const queryKey: QueryKey = ["comments"];

export function useCreateCommentMutationOptimistic() {
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

    // Handle optimistic updates
    onMutate: async (newCommentData) => {
      // Cancel any outgoing refetches to avoid them overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value for rollback in case of error
      const previousData =
        queryClient.getQueryData<
          InfiniteData<CommentsResponse, number | undefined>
        >(queryKey);

      const optimisticId = Date.now();
      const optimisticComment: Comment = {
        id: optimisticId,
        clientId: optimisticId,
        text: newCommentData.text,
        // In a real app, user data would come from your auth provider
        user: {
          name: "Current User",
          avatar: "CU",
        },
        createdAt: new Date().toISOString(),
      };

      // Update the cache with our optimistic comment
      queryClient.setQueryData<
        InfiniteData<CommentsResponse, number | undefined>
      >(queryKey, (oldData) => {
        const firstPage = oldData?.pages[0];

        if (firstPage) {
          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                totalComments: firstPage.totalComments + 1,
                comments: [optimisticComment, ...firstPage.comments],
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      });

      // Return the previous data and optimisticId for handlers
      return { previousData, optimisticId };
    },

    // If the mutation fails, roll back to the previous state
    onError: (_err, _newComment, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },

    // On success, replace the optimistic comment with the actual one from the server
    onSuccess: (savedComment, _newComment, context) => {
      queryClient.setQueryData<
        InfiniteData<CommentsResponse, number | undefined>
      >(queryKey, (oldData) => {
        if (!oldData || !context?.optimisticId) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            comments: page.comments.map((comment) =>
              comment.id === context.optimisticId
                ? { ...savedComment, clientId: context.optimisticId } // Preserve clientId to keep React key stable
                : comment
            ),
          })),
        };
      });
    },
  });
}
