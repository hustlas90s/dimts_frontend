import { useEffect } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	ZAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ScatterChart,
	Scatter,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getKmeansClustering } from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import cluster from "cluster";

const ClusteringView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, cluster1, cluster2, cluster3, cluster4, cluster5 } =
		useAppSelector((state) => state.dataState);

	useEffect(() => {
		dispatch(getKmeansClustering());
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="K-Means Clustering" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<h4 className="text-xl font-black tracking-wider">
					K-Means Clustering
				</h4>
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
								dataKey="x"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								hide
							/>
							<YAxis
								dataKey="y"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								domain={[1, 8]}
							/>
							<Tooltip cursor={{ strokeDasharray: "3 3" }} />
							<Legend />
							<Scatter
								name="Cluster 1"
								data={cluster1}
								fill="#8884d8"
							/>
							<Scatter
								name="Cluster 2"
								data={cluster2}
								fill="#82ca9d"
							/>
							<Scatter
								name="Cluster 3"
								data={cluster3}
								fill="pink"
							/>
							<Scatter
								name="Cluster 4"
								data={cluster4}
								fill="#0d9488"
							/>
							<Scatter
								name="Cluster 5"
								data={cluster5}
								fill="#6366f1"
							/>
						</ScatterChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
};

export default ClusteringView;
