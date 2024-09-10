import React from 'react'

export default function useProducts() {
         
    function getProduct(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
       
         }
         let productInfo =useQuery({
           queryKey:['recentProduct'],
           queryFn:getProduct
         })
         if(isError){
           return <h3>{error}</h3>
         }
         
         if(isLoading){
           return <div className="spinner">
           <div className="bounce1"></div>
           <div className="bounce2"></div>
           <div className="bounce3"></div>
         </div>
         }
         
         // const [Products, setProducts] = useState([])
         // function getProducts(){
           
         //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
         //   .then((res)=>{setProducts(res.data.data);
         //   })
         //   .catch((res)=>{})
         // }
         // useEffect(()=>{
         //   getProducts()
         // },[]);
  return (
    
         productInfo

  )
}
