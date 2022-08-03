import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Link from "next/link";

const Home = () => {
	return (
		<div>
			<Link href="/api/auth/signin">
				<a>Sign In</a>
			</Link>
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
