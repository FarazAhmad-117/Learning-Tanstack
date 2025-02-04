import { useQuery, useMutation } from "@tanstack/react-query";

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

const App = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...posts]),
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
      <h1>Learning tanstack</h1>
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
