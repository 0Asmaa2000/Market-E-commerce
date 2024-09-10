import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext =createContext();
export default function CartContextProvider(Props){
  const [cardId, setcardId] = useState(0)
  const [numberItems, setnumberItems] = useState(0)
    let headers ={token:localStorage.getItem('userToken')}
    function addProductToCart(productId){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId,},{headers}).then((res)=>res).catch((err)=>err)
    }
    function getLoggedUsercart(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).
      then((res)=> {
        // console.log(res.data.numOfCartItems);
        setnumberItems(res.data.numOfCartItems)
        setcardId(res.data.data._id)
        return res}
    ).catch((err)=>err)
     }
    function updateCartProductQuantit(producdId,newCount){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${producdId}`,{count:newCount },{headers}).then((res)=>res).catch((err)=>err)
     }
     function deletCartItem(productId){
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}).then((res)=>res).catch((err)=>err)
     }
     function clearCart(){
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((res)=>res).catch((err)=>err)
     }
     async function checkOut(cartId,url,formData) {
    
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:formData},{headers})
      .then((res)=>res)
      .catch((err)=>err)
      }  
      useEffect(()=>{getLoggedUsercart()},[])
      
    return <CartContext.Provider value={{deletCartItem,addProductToCart,getLoggedUsercart,updateCartProductQuantit,clearCart,checkOut,cardId, setnumberItems,numberItems}}>
{Props.children}
    </CartContext.Provider>
}


