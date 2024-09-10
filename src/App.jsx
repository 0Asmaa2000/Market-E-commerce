// import React, { useContext } from 'react'
import { BrowserRouter, createBrowserRouter,  createHashRouter,  RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Regisrer from './Components/Regisrer/Regisrer';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import Home from './Components/Home/Home';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Electronics from './Components/Electronics/Electronics';
import Men from './Components/Men/Men'
import Woman from './Components/Woman/Woman';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import WishList from './Components/WishList/WishList';
import { WishContextProvider } from './Context/WishContext';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import ResetCode from './Components/ResetCode/ResetCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
ResetPassword
let Query = new QueryClient()



let x =createBrowserRouter([
{path:'', element:<Layout/>,children:[
  {index:true,element: <ProtectedRoute><Home/></ProtectedRoute>},
  {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:'productdetails/:id/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'register',element: <Regisrer/>},
  {path:'Login',element:<Login/> },
  {path:'Products',element:<ProtectedRoute><Products/></ProtectedRoute>    },
  {path:'elctronics',element:<ProtectedRoute><Electronics/></ProtectedRoute>    },
  {path:'men',element:<ProtectedRoute><Men/></ProtectedRoute>    },
  {path:'woman',element:<ProtectedRoute><Woman/></ProtectedRoute>    },
  {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>    },
  {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>    },
  {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>    },
  {path:'forget',element:<Forgetpassword/>    },
  {path:'resetcode',element:<ResetCode/>    },
  {path:'resetpassword',element:<ResetPassword/>    },
  {path:'*',element:<Notfound/>},
]
}


])
function App() {

  return (
    <>
<UserContextProvider>
<QueryClientProvider client={Query}>
  <CartContextProvider>
    <WishContextProvider>

<RouterProvider router={x}></RouterProvider>
    </WishContextProvider>
<Toaster/>
  </CartContextProvider>
<ReactQueryDevtools/>

</QueryClientProvider>
</UserContextProvider>
    </>
  )
}

export default App
