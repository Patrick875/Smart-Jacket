import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

function Temperature({ graphData }) {
	return (
		<div style={{ width: "100%", height: 300 }}>
			<p className="text-center p-2 my-2">Temperature</p>
			<ResponsiveContainer>
				<LineChart
					data={graphData}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="x" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="y"
						connectNulls
						dot={{ strokeWidth: 2 }}
						activeDot={{ r: 8 }}
						stroke="#E4846B"
						strokeWidth="2"
						fill="#E4846B"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default Temperature;
