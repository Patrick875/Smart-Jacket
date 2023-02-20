// async function monitorDataChange(client, timeInMs = 60000, pipeline = []) {
// 	const collection = client.db("iot").collection("sensordatas");
// 	const changeStream = collection.watch(pipeline);
// 	changeStream.on("change", (next) => {
// 		console.log(next);
// 	});

// 	await closeChangeStream(timeInMs,changeStream);
// }

/**
 * close a given change stream after a certain amaount of time
 * @param {*} timeInMs time in miliseconds to monitor the change
 * @param {*} changeStream the open changeStream that should be closed
 */

function closeChangeStream(timeInMs = 60000, changeStream) {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("changing the change stream");
			changeStream.close();
			resolve();
		}, timeInMs);
	});
}
