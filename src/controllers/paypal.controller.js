import {
    CLIENT_URL,
    HOST,
    PAYPAL_API,
    PAYPAL_API_CLIENT,
    PAYPAL_API_SECRET,
} from "../config/config.js";
import axios from "axios";

export const createOrder = async (req, res) => {
    try {
        const { totalPrice } = req.body;

        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: totalPrice.toString(),
                    },
                },
            ],
        };

        const accessToken = await generateAccessToken();

        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return res.json(response.data);
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        return res.status(500).json({ error: "Failed to create PayPal order" });
    }
};

export const captureOrder = async (req, res) => {
    try {
        const accessToken = await generateAccessToken();
        const { orderID } = req.body;
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
            { orderID },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status !== 201) {
            throw new Error("Failed to capture PayPal order");
        }

        return res.json(response.data);
    } catch (error) {
        console.error("Error capturing PayPal order:", error.message);
        return res
            .status(500)
            .json({ error: "Failed to capture PayPal order" });
    }
};

export const cancelPayment = (req, res) => {
    res.redirect(CLIENT_URL);
};

const generateAccessToken = async () => {
    try {
        if (!PAYPAL_API_CLIENT || !PAYPAL_API_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            PAYPAL_API_CLIENT + ":" + PAYPAL_API_SECRET
        ).toString("base64");

        const response = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
        throw error;
    }
};
