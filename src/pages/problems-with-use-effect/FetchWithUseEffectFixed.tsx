import { fetchData } from "@/lib/fetch-utils";
import { useEffect, useState } from "react";
import { Post } from "@/types";

export default function FetchWithUseEffectFixed({
  category,
}: {
  category: string;
}) {
  // Using undefined as initial state to distinguish between "no data yet" and "empty result"
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    // Fix race conditions with ignore flag
    let ignore = false;

    setIsLoading(true);

    async function fetchPosts() {
      try {
        if (category === "error-simulation") {
          throw new Error("Simulated network error");
        }

        // Simulate network delay match the problem component
        const delay = Math.random() * 3000 + 500; // 0.5s to 3.5s delay
        await new Promise((resolve) => setTimeout(resolve, delay));

        const data = await fetchData<Post[]>(`/api/posts?category=${category}`);

        // Only update state if this request is still relevant
        if (!ignore) {
          setPosts(data);
          // Don't forget to reset your states
          setError(undefined);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch error:", error);
          setError("Failed to fetch posts");
          setPosts(undefined);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, [category]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Posts
      </h2>

      <div>
        {isLoading ? (
          <div className="mb-4 text-blue-500">Loading posts...</div>
        ) : (
          <>
            {error && <div className="mb-4 text-red-500">Error: {error}</div>}

            {posts?.length === 0 && !error && (
              <div className="mb-4">No posts found for this category.</div>
            )}

            {posts && posts.length > 0 && (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li key={post.id} className="border p-3 rounded">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
