const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const { lat, lng } = event.queryStringParameters;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
