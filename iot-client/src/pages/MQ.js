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

function MQ({ graphData }) {
	return (
		<div style={{ width: "100%", height: 300, marginTop: "2em" }}>
			<p className="text-center p-2 my-2">CO level</p>
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
						stroke="#605959"
						fill="#605959"
						connectNulls
						dot={{ strokeWidth: 2 }}
						activeDot={{ r: 8 }}
						strokeWidth="2"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default MQ;
