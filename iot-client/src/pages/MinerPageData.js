//jshint esversion:9
import React from "react";
import { useNavigate } from "react-router-dom";
import ECGE from "./ECGE";
import Humidity from "./Humidity";
import MQ from "./MQ";
import Temperature from "./Temperature";

function MinerPageData({ data }) {
	let navigate = useNavigate();
	if (data == null) {
		navigate("/user/miner");
	}
	const temperature = data.map((data) => {
		return {
			x: data.createdAt,
			y: data.temperature,
		};
	});
	const humidity = data.map((data) => {
		return {
			x: data.createdAt,
			y: data.humidity,
		};
	});
	const co_level = data.map((data) => {
		return {
			x: data.createdAt,
			y: data.co_level,
		};
	});
	const ecg = data.map((data) => {
		return {
			x: data.createdAt,
			y: data.ecg,
		};
	});

	return (
		<div className="container-fluid mx-0 px-0 ">
			<div className="head  text-center  d-flex flex-row justify-content-between shadow">
				<p
					className="text-uppercase  pt-2 px-2"
					style={{ fontFamily: "Merriweather" }}>
					{" "}
					Dei Francois
				</p>
				<p
					className="text-uppercase  pt-2 px-2"
					style={{ fontFamily: "Merriweather" }}>
					{" "}
					Age: 20
				</p>
				<p
					className="text-uppercase pt-2 px-2 text-danger "
					style={{ fontFamily: "Merriweather" }}>
					{" "}
					Emergency Tel: 0780000000
				</p>
			</div>

			<div className="d-flex flex-column g-2">
				<div className="d-flex flex-row my-2 ">
					<Temperature graphData={temperature} />
					<ECGE graphData={ecg} />
				</div>
				<div className="d-flex flex-row ">
					<Humidity graphData={humidity} />
					<MQ graphData={co_level} />
				</div>
			</div>
		</div>
	);
}

export default MinerPageData;
