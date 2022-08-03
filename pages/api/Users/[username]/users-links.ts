import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

const UsersLinks = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const db = client.db("link-store");

	const {
		query: { username },
		method,
	} = req;

	switch (method) {
		case "PUT":
			try {
				let user = await db
					.collection("users")
					.findOneAndUpdate({ email: username }, { $push: { ...req.body } });
				if (!user) {
					if (!user) {
						return res.status(400).json({ success: false });
					}
				}
				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		// case "DELETE":
		// 	try {
		// 		let user = await db.collection("users").findOneAndDelete({ username: username });
		// 		if (!user) {
		// 			if (!user) {
		// 				return res.status(400).json({ success: false });
		// 			}
		// 			return res.status(400).json({ success: false });
		// 		}
		// 		res.status(200).json({ success: true, data: {} });
		// 	} catch (error) {
		// 		res.status(400).json({ success: false });
		// 	}
		// 	break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

export default UsersLinks;
