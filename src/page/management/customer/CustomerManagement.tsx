import {columns} from "@/components/management/customer/columns.tsx";
import {DataTable} from "@/components/management/customer/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect} from "react";
import {getAllCustomers} from "@/redux/slice/user.slice.ts";

const CustomerManagement = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user);
    const allCustomers = user.customer.all

    useEffect(() => {
        if (!allCustomers) {
            const promise = dispatch(getAllCustomers());
            return () => promise.abort()
        }
    },[allCustomers])

    return (
        <div className="grid px-4">
            <DataTable columns={columns} data={allCustomers?.items ? allCustomers.items : []}/>
        </div>
    )
}

export default CustomerManagement