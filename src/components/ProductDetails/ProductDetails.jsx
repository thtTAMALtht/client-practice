import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import AuthContext from "../../context/AuthContext";
import useAxiosHook from "../../hooks/useAxiosHook";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const productDetails = useLoaderData();
  const { _id: productId, title, price_min, price_max, image } = productDetails;
  const { user } = use(AuthContext);
  const axiosHook = useAxiosHook();
  const modalRef = useRef();
  const [bids, setBids] = useState([]);

  const handleModalOpen = () => {
    modalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(productId, name, email,image, bid);
    const bidsInfo = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
    };

    axiosHook.post("/bids", bidsInfo).then((data) => {
      console.log("after bids", data.data);
      if (data.data.insertedId) {
        bidsInfo._id = data.data.insertedId;
        const newBids = [...bids,bidsInfo]
        newBids.sort((a,b)=>b.bid_price-a.bid_price)
        setBids(newBids)


        toast.success("bids successfull");
        e.target.reset();
        modalRef.current.close();
      }
    });
  };

  useEffect(() => {
    axiosHook.get(`/products/bids/${productId}`).then((data) => {
      setBids(data.data);
      console.log(data.data);
    });
  }, [axiosHook, productId]);

  return (
    <div>
      {/* product card */}
      <div className="card bg-base-100 shadow-sm p-5">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>
            Price : {price_min} -{price_max}
          </p>
        </div>
        <button onClick={handleModalOpen} className="btn btn-sm btn-secondary">
          I want to buy this product
        </button>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          open modal
        </button> */}
        <dialog
          ref={modalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Give seller your offered price</p>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                <label className="label">Buyer Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  readOnly
                  defaultValue={user?.displayName}
                />
                <label className="label">Buyer Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  readOnly
                  defaultValue={user?.email}
                />
         
                <label className="label">Buyer Bit</label>
                <input
                  type="text"
                  className="input"
                  name="bid"
                  placeholder="your bid price"
                />
                <button className="btn btn-neutral mt-4">Submit</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* bids for this product */}
      <div>
        <h2>Bids for this product : {bids.length}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid,index) => (
                <tr key={bid._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid?.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                   {bid?.buyer_email}
                  </td>
                  <td>{bid?.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
