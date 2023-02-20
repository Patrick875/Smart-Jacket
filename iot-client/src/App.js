//jshint esversion:9
import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import * as Realm from "realm-web";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import PageLoading from "./pages/PageLoading";

const MinerPage = lazy(() => import("./pages/MinerPage"));

//import Login from "./pages/Login";

const app = new Realm.App({ id: "iot-xazym" });

function customizeDateOnData(data) {
	data = data.map((miner) => {
		miner.createdAt = new Date(miner.createdAt);
		return miner;
	});
	return data;
}
function customizeDate(data) {
	data.createdAt = new Date(data.createdAt).toLocaleTimeString([], {
		timeStyle: "short",
	});
	return data;
}

function App() {
	const [data, setData] = useState([]);
	//const [updated, setUpdated] = useState(false);
	let savedUser = localStorage.getItem("user");
	const [user, setUser] = useState();
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let res = await axios.get(
				"https://colorful-suspenders-cow.cyclic.app/api/sensor"
			);
			let miners = res.data.data;
			miners = customizeDateOnData(miners);
			setData(miners);
		};

		getData();

		const login = async () => {
			// Authenticate anonymously
			const user = await app.logIn(Realm.Credentials.anonymous());
			setUser(user); // Connect to the database
			localStorage.setItem("user", JSON.stringify(user));

			const mongodb = app.currentUser.mongoClient("mongodb-atlas");
			const collection = mongodb.db("iot").collection("sensordatas"); // Everytime a change happens in the stream, add it to the list of events

			for await (const change of collection.watch()) {
				setEvents((events) => [...events, change]);
				let newData = JSON.stringify(events[events.length].fullDocument);
				newData = customizeDate(newData);
				setData((data) => [...data, newData]);
				console.log("yes");
			}
		};
		login();
	}, [events]);

	return (
		<div className="App">
			{!!(user || savedUser) && (
				<Router>
					<Routes>
						<Route
							path="/"
							element={
								<Suspense fallback={<PageLoading />}>
									<Home />
								</Suspense>
							}></Route>
						<Route
							path="/user/miner/*"
							element={
								<Suspense fallback={<PageLoading />}>
									<MinerPage data={data} />
								</Suspense>
							}></Route>
					</Routes>
				</Router>
			)}
		</div>
	);
}

export default App;

// <div>
// 					// 	<p>Latest events:</p>

// 					// 	<table>
// 					// 		<thead>
// 					// 			<tr>
// 					// 				<td>Operation</td>
// 					// 				<td>Document Key</td>
// 					// 				<td>Full Document</td>
// 					// 			</tr>
// 					// 		</thead>

// 					// 		<tbody>
// 					// 			{events.map((e, i) => (
// 					// 				<tr key={i}>
// 					// 					<td>{e.operationType}</td>
// 					// 					<td>{e.documentKey._id.toString()}</td>
// 					// 					<td>{JSON.stringify(e.fullDocument)}</td>
// 					// 				</tr>
// 					// 			))}
// 					// 		</tbody>
// 					// 	</table>
// 					// </div>
