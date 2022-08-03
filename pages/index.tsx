import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

const Home = () => {
	return (
		<div>
			<a href="/api/auth/signin">Sign In</a>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			props: {},
		};
	} else {
		return {
			redirect: {
				destination: "/me",
				permanent: false,
			},
		};
	}
};

export default Home;
