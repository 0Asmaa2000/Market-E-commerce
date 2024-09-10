import axios from "axios";
import { createContext } from "react";


export let WishContext=createContext();
let headers ={token:localStorage.getItem('userToken')}

export function WishContextProvider(props){
    function AddWishListToCart(productId){
return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers}).then((res)=>res).catch((err)=>err)
    }

 function getWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).
        then((res)=>res)
      .catch((err)=>err)
       }
       async function deletWishItem(productId) {
        try {
          const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {headers});
          return response;
        } catch (error) {
          console.error('Error deleting item:', error);
          throw error; 
        }
      }
      
return <WishContext.Provider value={{AddWishListToCart,getWishList,deletWishItem}}>
    {props.children}
</WishContext.Provider>
}