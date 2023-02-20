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

function Humidity({ graphData }) {
	return (
		<div style={{ width: "100%", height: 300, marginTop: "2em" }}>
			<p className="text-center p-2 my-2">Humidity</p>
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
						stroke="#0E6192"
						strokeWidth="2"
						connectNulls
						dot={{ strokeWidth: 2 }}
						activeDot={{ r: 8 }}
						fill="#0E6192"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default Humidity;
