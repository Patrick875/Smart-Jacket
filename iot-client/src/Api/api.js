import axios from "axios";
//https://iotserver.vercel.app/api/sensor
export const endpoint = axios.create({
	baseURL: "https://iotserver.vercel.app/api/sensor",
});

export const getData = async (data) => {
	const sensorData = await endpoint.get("/").catch((err) => {
		console.log({ name: err.name, message: err.message });
	});
	data = sensorData.data;
	console.log(sensorData.data);
	return data;
};
