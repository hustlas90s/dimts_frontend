import { useEffect, useState } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ScatterChart,
	BarChart,
	Scatter,
	Bar,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	getClustering,
	fetchCrimeTypesSummary,
} from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";

const ClusteringView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, clusterList, clusterYears, crimeTypesSummaryList } =
		useAppSelector((state) => state.dataState);

	// const [chartLegends, setChartLegends] = useState([
	// 	{ value: "2022", type: "plainline", color: "#112E51" },
	// 	{ value: "2023", type: "plainline", color: "#0071bc" },
	// ]);

	useEffect(() => {
		dispatch(getClustering()).then((res: any) => {
			console.log("Get clustering: ", res.payload);
		});
		dispatch(fetchCrimeTypesSummary());
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
								domain={["dataMin", "dataMax"]}
							/>
							<Legend
								payload={clusterYears.map((year: any) => {
									return { value: year, type: "line", color: "#8b5cf6" };
								})}
							/>
							<Tooltip
								cursor={{ strokeDasharray: "3 3" }}
								content={<CustomToolTip />}
							/>
							<Scatter
								// name="Custom Name"
								data={clusterList}
								fill="#8884d8"
							/>
						</ScatterChart>
					</ResponsiveContainer>
				)}
			</div>
			{/*  */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<h4 className="text-xl font-black tracking-wider">
					Crime Types Summary
				</h4>
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{!dataLoading && (
					<ResponsiveContainer
						width="100%"
						height={400}
					>
						<BarChart
							data={crimeTypesSummaryList}
							margin={{
								top: 10,
								bottom: 5,
								left: -35,
							}}
							style={{
								fontSize: "12px",
							}}
						>
							<CartesianGrid
								opacity={0.3}
								vertical={false}
							/>
							<XAxis
								dataKey="crime_type"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								style={{
									fontSize: "12px",
								}}
							/>
							<YAxis
								dataKey="total"
								strokeWidth={0.5}
								tickLine={false}
								style={{
									fontSize: "10px",
								}}
								domain={[0, "dataMax"]}
								tick={(value) => {
									if (value.visibleTicksCount % 1 === 0) {
										return value.visibleTicksCount;
									}
								}}
							/>
							<Tooltip />
							<Bar
								dataKey="total"
								fill="#4c1d95"
							/>
							{/* <Bar
								dataKey="civil"
								fill="#8b5cf6"
							/> */}
							{/* <Legend /> */}
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
};

function CustomToolTip({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-col shadow border-b border-gray-300 text-gray-700">
				<p className="capitalize">
					<span className="font-medium">Value: </span>
					{payload[0].payload.y}
				</p>
			</div>
		);
	}
	return null;
}

function CustomToolTip2({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-col shadow border-b border-gray-300 text-gray-700">
				<p className="capitalize">
					<span className="font-medium">Crime: </span>
					{JSON.stringify(payload[0])}
				</p>
			</div>
		);
	}
	return null;
}

export default ClusteringView;
