// import '@/App.css'
import Register from "@/page/Register";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "@/page/Login.tsx";
import Home from "@/page/Home.tsx";
import Collection from "@/page/Collection.tsx";
import MainClientLayout from "@/layout/MainClientLayout.tsx";
import Cart from "@/page/Cart";
import PlaceOrder from "@/page/PlaceOrder.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect} from "react";
import {introspect} from "@/redux/slice/account.slice.ts";
import ProductDetail from "@/page/ProductDetail.tsx";
import Profile from "@/page/Profile.tsx";
import MainManagementLayout from "@/layout/MainManagementLayout.tsx";
import Dashboard from "@/page/management/Dashboard.tsx";
import CustomerManagement from "@/page/management/customer/CustomerManagement.tsx";
import OrderResult from "@/page/OrderResult.tsx";
import AddCustomer from "@/page/management/customer/AddCustomer.tsx";
import EditCustomer from "@/page/management/customer/EditCustomer.tsx";
import AddProduct from "@/page/management/product/AddProduct.tsx";
import EditProduct from "@/page/management/product/EditProduct.tsx";
import ProductManagement from "@/page/management/product/ProductManagement.tsx";
import CategoryManagement from "@/page/management/category/CategoryManagement.tsx";

function App() {
    const dispatch = useAppDispatch();
    const {isAuthenticated, userInfo} = useAppSelector(state => state.account);

    useEffect(() => {
        if (window.location.pathname === "/login" || window.location.pathname === "/register") return;
        if (!isAuthenticated && !userInfo) {
            dispatch(introspect())
        }
    }, [dispatch, isAuthenticated, userInfo]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainClientLayout/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: 'register',
                    element: <Register/>,
                },
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: "collection/:id",
                    element: <Collection/>
                },
                {
                    path: 'products/:id',
                    element: <ProductDetail/>
                },
                {
                    path: 'cart',
                    element: <Cart/>
                },
                {
                    path: 'place-order',
                    element: <PlaceOrder/>
                },
                {
                    path: "order-result",
                    element: <OrderResult/>
                },
                {
                    path: 'profile',
                    element: <Profile/>
                }
            ]
        },
        {
            path: "/",
            element: <MainManagementLayout/>,
            children: [
                {
                    path: "dashboard",
                    element: <Dashboard/>
                },
                {
                    path: "customer-management",
                    children: [
                        {
                            path: '',
                            element: <CustomerManagement/>
                        },
                        {
                            path: "add",
                            element: <AddCustomer/>
                        },
                        {
                            path: "edit/:id",
                            element: <EditCustomer/>
                        }
                    ]
                },
                {
                    path: "product-management",
                    children: [
                        {
                            path: '',
                            element: <ProductManagement/>
                        },
                        {
                            path: "add",
                            element: <AddProduct/>
                        },
                        {
                            path: "edit/:id",
                            element: <EditProduct/>
                        }
                    ]
                },
                {
                    path: "category-management",
                    children: [
                        {
                            path: '',
                            element: <CategoryManagement/>
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App
