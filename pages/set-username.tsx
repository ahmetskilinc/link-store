import axios from "axios";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

const Home = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	let username = useRef({} as HTMLInputElement);
	const setUsername = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (status === "authenticated") {
			axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/Users/${session.user!.email}`, {
				username: username.current.value,
			});
			router.push("/me");
		}
	};

	return (
		<div>
			<h1>set your username to begin</h1>
			<form onSubmit={setUsername}>
				<input type="text" name="username" placeholder="username" ref={username} />
				<input type="submit" value="Set Username" />
			</form>
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
