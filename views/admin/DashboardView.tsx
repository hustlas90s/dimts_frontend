import AdminBreadCrumbs from "../../components/admin/AdminBreadCrumbs"


const DashboardView = () => {
    return (
        <div className="flex flex-col gap-y-5 font-mont text-gray-700">
            <AdminBreadCrumbs activeText="Dashboard" />
            {/*  */}
            <div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
                <div className="w-full flex justify-between">
                    <h4 className="text-xl font-black tracking-wider">Mailed Documents</h4>
                </div>
                {/*  */}
                <div className="w-full border-b border-gray-200 -mt-3"></div>
            </div>
            {/*  */}
            <div className="w-full grid grid-cols-2 gap-x-5">
                {/*  */}
                <div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
                    <div className="w-full flex justify-between">
                        <h4 className="text-xl font-black tracking-wider">Incoming Hearings</h4>
                    </div>
                    <div className="w-full border-b border-gray-200 -mt-3"></div>
                </div>
                {/*  */}
                <div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
                    <div className="w-full flex justify-between">
                        <h4 className="text-xl font-black tracking-wider">Recent Cases</h4>
                    </div>
                    <div className="w-full border-b border-gray-200 -mt-3"></div>
                </div>
            </div>
            {/*  */}
        </div>
    )
}

export default DashboardView