import React, { useContext, useEffect, useState } from 'react';
import { WishContext } from '../../Context/WishContext';
import toast from 'react-hot-toast';

export default function WishList() {
  const { getWishList, deletWishItem } = useContext(WishContext);
  const [wishDetails, setWishDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearWishList, setClearWishList] = useState(false);
  const [loadingId, setLoadingId] = useState(null); 

  // Function to fetch wishlist items
  async function fetchWishListItems() {
    try {
      setLoading(true);
      const response = await getWishList();
      if (response.status === 200) {
        if (response.data.data) {
          setWishDetails(response.data.data);
        } else {
          toast.error('No data found in the response.');
        }
      } else {
        toast.error(response.statusText || 'API request failed.');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Function to delete a wishlist item
  async function deleteItem(id) {
    setLoadingId(id); 
    try {
      const response = await deletWishItem(id);
      if (response.data.status === 'success' && response.status === 200) {
        setWishDetails((prevItems) => prevItems.filter((item) => item._id !== id));
        toast.success('Item removed successfully');
      } else {
        toast.error('Error removing item');
      }
    } catch (error) {
      toast.error('Error removing item');
    }
  }

  useEffect(() => {
    fetchWishListItems();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <i className="fas fa-spinner fa-spin text-4xl"></i>
        </div>
      )}
      {wishDetails?.length === 0 && !loading && <div>No data available</div>}
      {wishDetails?.length > 0 && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {wishDetails.map((item) => (
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={item.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </td>
                <td className="px-6 py-4">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  ${item.price}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); 
                      deleteItem(item._id);
                    }}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    {loadingId === item._id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      'Remove'
                    )}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
