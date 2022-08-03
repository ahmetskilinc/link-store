import axios from "axios";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import AddNewLink from "../components/AddNewLink";
import Profile from "../components/Profile";

type Props = {
	user: any;
};

const Me = ({ user }: Props) => {
	return (
		<div>
			<Profile user={user} />
			<AddNewLink />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	const user = (
		await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/Users/${session.user?.email}`)
	).data.data;

	if (!user.username) {
		return {
			redirect: {
				destination: "/set-username",
				permanent: false,
			},
		};
	}

	return {
		props: {
			user,
		},
	};
};

export default Me;
