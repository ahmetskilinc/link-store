import { useSession, signIn, signOut } from "next-auth/react";

function LoginButton() {
	const { data: session, status } = useSession();
	if (status === "authenticated") {
		return <button onClick={() => signOut()}>Sign out</button>;
	}
	return <button onClick={() => signIn()}>Sign in</button>;
}

export default LoginButton;
