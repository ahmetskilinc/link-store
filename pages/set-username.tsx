import axios from "axios";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	let username = useRef({} as HTMLInputElement);
	const setUsername = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (status === "authenticated") {
			axios.put(`http://localhost:3000/api/Users/${session.user!.email}`, {
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

export default Home;
