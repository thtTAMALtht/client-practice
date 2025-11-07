import { use } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const CreateProduct = () => {
const user = use(AuthContext)
const axiosSecureHook = useAxiosSecure();

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    // console.log(title,image,price_min,price_max);

    const productInfo = {
      title,
      image,
      price_min,
      price_max,
      email: user?.email,
      seller_name: user?.displayName,
    };

    axiosSecureHook.post("/products",productInfo)
    .then(data=>{
      if(data.data.insertedId){
        toast.success("product added successfully")
      };
    })

    
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 border-2 p-4 border-purple-300 rounded-md">
      <form onSubmit={handleCreateProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            name="title"
            className="input w-full"
            placeholder="Title"
          />
          {/* email */}
          <label className="label">Image Url</label>
          <input
            type="text"
            name="image"
            className="input w-full"
            placeholder="Image"
          />

          {/* bid amount */}
          <label className="label">Min Price</label>
          <input
            type="text"
            name="price_min"
            className="input w-full"
            placeholder="Min Price"
          />
          <label className="label">Max Price</label>
          <input
            type="text"
            name="price_max"
            className="input w-full"
            placeholder="Max Price"
          />

          <button className="btn btn-neutral mt-4">Add Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProduct;
