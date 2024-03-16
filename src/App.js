import "./App.css";
import { getProducts, deleteProduct } from "./api/api";
import { useQuery, useQueryClient, useMutation } from "react-query";

function App() {
  const queryClient = useQueryClient();

  // const { data, isLoading } = useQuery(["Products"], getProducts, {
  //   refetchOnWindowFocus: false
  // });

  const { data, isLoading } = useQuery({
    queryFn: getProducts,
    queryKey: "Products",
    refetchOnWindowFocus: false
  });

  // if (isLoading) return <p>Loading...</p>;

  const { products } = data || [];
  console.log("data", products);

  // Delete Product

  // const deleteMutation = useMutation(deleteProduct, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("Products");
  //   }
  // });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("Products");
    }
  });

  console.log("mutation", deleteMutation.data);

  return (
    <div className="App">
      <h1>Product List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        products.map(product => (
          <Product
            key={product.id}
            product={product}
            deleteMutation={deleteMutation}
          />
        ))
      )}
    </div>
  );
}

const Product = ({ product, deleteMutation }) => {
  return (
    <div>
      <p>{product.title}</p>
      <button onClick={() => deleteMutation.mutate(product)}>Delete !</button>
    </div>
  );
};

export default App;
