import { use, useEffect, useState } from "react";
import useAxiosHook from "../../hooks/useAxiosHook";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const axiosHook = useAxiosHook();
  const { user } = use(AuthContext);
  const [myBids, setMyBids] = useState([]);
  useEffect(() => {
    if (user?.email) {
      axiosHook.get(`/bids?email=${user?.email}`).then((data) => {
        setMyBids(data.data);
      });
    }
  }, [axiosHook, user?.email]);

  const handleRemoveBit = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosHook.delete(`/bids/${id}`).then((data) => {
          if (data.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            const remainingBids = myBids.filter((bids) => bids._id !== id);
            setMyBids(remainingBids);
          }
        });
      }
    });
  };

  return (
    <div>
      <div>mybids : {myBids.length}</div>
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
            {myBids.map((bid, index) => (
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
                <td>{bid?.buyer_email}</td>
                <td>{bid?.bid_price}</td>
                <th>
                  <button
                    onClick={() => handleRemoveBit(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
