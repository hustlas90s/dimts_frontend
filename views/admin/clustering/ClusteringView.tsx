import { useEffect } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ScatterChart,
	Scatter,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getClustering } from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";

const ClusteringView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, clusterList } = useAppSelector(
		(state) => state.dataState
	);

	useEffect(() => {
		dispatch(getClustering());
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="DBSCAN Clustering" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<h4 className="text-xl font-black tracking-wider">DBSCAN Clustering</h4>
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{dataLoading && (
					<div className="w-full flex justify-center items-center">
						<MoonLoader
							loading={dataLoading}
							color="#9333ea"
							speedMultiplier={1}
							size={70}
						/>
					</div>
				)}
				{!dataLoading && (
					<ResponsiveContainer
						width="100%"
						height={400}
					>
						<ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
							<CartesianGrid
								opacity={0.3}
								vertical={false}
							/>
							<XAxis
								dataKey="year"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								hide
							/>
							<YAxis
								dataKey="cluster"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								domain={[1, 8]}
							/>
							<Legend />
							<Tooltip cursor={{ strokeDasharray: "3 3" }} />
							<Scatter
								// name="Custom Name"
								data={clusterList}
								fill="#8884d8"
							/>
						</ScatterChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
};

export default ClusteringView;
