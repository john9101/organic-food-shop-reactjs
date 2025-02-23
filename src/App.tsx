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
import {getAccountInfo} from "@/redux/slice/account.slice.ts";
import ProductDetail from "@/page/ProductDetail.tsx";
import AccountInfo from "@/page/AccountInfo.tsx";
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
import EmployeeManagement from "@/page/management/employee/EmployeeManagement.tsx";
import AddEmployee from "@/page/management/employee/AddEmployee.tsx";
import EditEmployee from "@/page/management/employee/EditEmployee.tsx";
import OrderManagement from "@/page/management/order/OrderManagement.tsx";
import AddOrder from "@/page/management/order/AddOrder.tsx";
import EditOrder from "@/page/management/order/EditOrder.tsx";
import VoucherManagement from "@/page/management/voucher/VoucherManagement.tsx";
import BrandManagement from "@/page/management/brand/BrandManagement.tsx";
import {AccountManagementLayout} from "@/layout/AccountManagementLayout.tsx";
import AccountAddress from "@/page/AccountAddress.tsx";
import AccountChangePassword from "@/page/AccountChangePassword.tsx";
import AccountOrder from "@/page/AccountOrder.tsx";

function App() {
    // const dispatch = useAppDispatch();
    // const {isAuthenticated, userInfo} = useAppSelector(state => state.account);
    //
    //
    // useEffect(() => {
    //     if (window.location.pathname === "/login" || window.location.pathname === "/register") return;
    //     if (!isAuthenticated && !userInfo) {
    //         dispatch(introspect())
    //     }
    // }, [dispatch, isAuthenticated, userInfo]);

    const dispatch = useAppDispatch();
    const {account} = useAppSelector(state => state.account);
    const accountInfo = account.info.got

    useEffect(() => {
        if (window.location.pathname === "/login" || window.location.pathname === "/register") return;
        if (!accountInfo) {
            dispatch(getAccountInfo())
        }
    }, [dispatch, accountInfo]);

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
                    path: 'account/',
                    element: <AccountManagementLayout/>,
                    children: [
                        {
                            path: "info",
                            element: <AccountInfo/>
                        },
                        {
                            path: "address",
                            element: <AccountAddress/>
                        },
                        {
                            path: "change-password",
                            element: <AccountChangePassword/>
                        },
                        {
                            path: "order",
                            element: <AccountOrder/>
                        }
                    ]
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
                    path: "employee-management",
                    children: [
                        {
                            path: '',
                            element: <EmployeeManagement/>
                        },
                        {
                            path: "add",
                            element: <AddEmployee/>
                        },
                        {
                            path: "edit/:id",
                            element: <EditEmployee/>
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
                },
                {
                    path: "brand-management",
                    children: [
                        {
                            path: '',
                            element: <BrandManagement/>
                        }
                    ]
                },
                {
                    path: "order-management",
                    children: [
                        {
                            path: '',
                            element: <OrderManagement/>
                        },
                        {
                            path: "add",
                            element: <AddOrder/>
                        },
                        {
                            path: "edit/:id",
                            element: <EditOrder/>
                        }
                    ]
                },
                {
                    path: "voucher-management",
                    children: [
                        {
                            path: '',
                            element: <VoucherManagement/>
                        }
                    ]
                },
            ]
        },
    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App
