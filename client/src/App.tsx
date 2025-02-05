import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

// /posts >>> ["posts"]
// /posts/2 >>> ["posts", post.id ]
// /posts?authorId=1 >>> ["posts", { authorId: 1 } ]
// /posts/2/comments >>> ["posts", post.id , "comments"]

const App = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...posts]),
  });

  const postMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() => posts.push({ id: posts.length + 1, title }));
    },
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  // To generate an error
  // const postsQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => Promise.reject("Error Message!"),
  // });

  if (postsQuery.isLoading) return <h1>Loading....</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={postMutation.isPending}
        onClick={() => postMutation.mutate("New Post")}
      >
        Add Post
      </button>
    </div>
  );
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// What could I do in react query ???

// 1 - Query: Getting data from somewhere (e.g get blogs list)

// 2- Mutation: Changing some type of data (e.g. create blog)

export default App;
