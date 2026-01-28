import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateCommentMutation } from "./use-comments-hooks";
import { useCreateCommentMutationOptimistic } from "./use-comments-hooks-optimistic";

export function CommentForm({ isOptimistic = false }: { isOptimistic?: boolean }) {
  const [commentText, setCommentText] = useState("");

  const optimisticMutation = useCreateCommentMutationOptimistic();
  const normalMutation = useCreateCommentMutation();

  const mutation = isOptimistic ? optimisticMutation : normalMutation;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!commentText.trim()) return;

    mutation.mutate(
      { text: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Comment posted successfully!");
        },
        onError: () => {
          toast.error("Failed to post comment. Please try again.");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1"
        disabled={mutation.isPending}
      />
      <Button
        type="submit"
        disabled={!commentText.trim() || mutation.isPending}
        className="min-w-[80px]"
      >
        {mutation.isPending ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
