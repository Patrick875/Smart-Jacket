//jshint esversion:9
import React from "react";
import Header from "./Header";
import { Calendar } from "react-multi-date-picker";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MinerPageData from "./MinerPageData";

function setDataForSelectedDate(data, date) {
	return data.map((data) =>
		new Date(data.createdAt).toLocaleDateString() === date
			? {
					...data,
					createdAt: new Date(data.createdAt).toLocaleTimeString([], {
						timeStyle: "short",
					}),
			  }
			: null
	);
}

function MinerPage({ data }) {
	const dates = data.map((data) => new Date(data.createdAt));
	let months = data.map((date) => new Date(date.createdAt).getMonth() + 1);
	let navigate = useNavigate();
	let uniqueMonths = [...new Set(months)];
	let uniqueDates = data.map((date) =>
		new Date(date.createdAt).toLocaleDateString()
	);
	uniqueDates = [...new Set(uniqueDates)];

	let dataToDisplay = [];
	const [dataForGraphs, setDataForGraphs] = useState([]);

	return (
		<div className="container-fluid mx-0 px-0 ">
			<Header />

			<Routes>
				<Route
					path="/"
					element={
						<div>
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
							<div className="d-flex flex-row justify-content-center align-content-center mt-2">
								<Calendar
									multiple
									numberOfMonths={uniqueMonths.length}
									onFocusedDateChange={(dateFocused, dateClicked) => {
										let clickedDateAsString = dateClicked
											.format("DD-MM-YYYY")
											.toString()
											.replaceAll("-", "/");
										if (uniqueDates.includes(clickedDateAsString)) {
											let getdataForNextPage = setDataForSelectedDate(
												data,
												clickedDateAsString
											);
											dataToDisplay = getdataForNextPage.filter(
												(date) => date != null
											);
											setDataForGraphs((dataForGraphs) => [
												...dataForGraphs,
												...dataToDisplay,
											]);

											navigate(`/user/miner/date`);
										}
									}}
									months={uniqueMonths}
									value={dates}
								/>
							</div>
						</div>
					}
				/>
				<Route path="/date" element={<MinerPageData data={dataForGraphs} />} />
			</Routes>
		</div>
	);
}

export default MinerPage;

// <div className="d-flex flex-column g-2">
// 	<div className="d-flex flex-row my-2 ">
// 		<Temperature graphData={temperature} />
// 		<ECGE graphData={ecg} />
// 	</div>
// 	<div className="d-flex flex-row ">
// 		<Humidity graphData={humidity} />
// 		<MQ graphData={co_level} />
// 	</div>
// </div>;
