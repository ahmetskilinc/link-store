import axios from "axios";
import { useRef } from "react";
import { useSession } from "next-auth/react";

type Props = {};

const AddNewLink = (props: Props) => {
	const { data: session, status } = useSession();
	let link = useRef({} as HTMLInputElement);
	let title = useRef({} as HTMLInputElement);
	const addNewLink = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (status === "authenticated") {
			axios.put(`http://localhost:3000/api/Users/${session.user!.email}/users-links`, {
				links: {
					link: link.current.value,
					title: title.current.value,
				},
			});
		}
	};

	return (
		<div>
			<h2>Add New Link</h2>
			<form onSubmit={addNewLink}>
				<input type="text" name="link" placeholder="link" ref={link} />
				<br />
				<input type="text" name="title" placeholder="title" ref={title} />
				<br />
				<input type="submit" value="Add New Link" />
			</form>
		</div>
	);
};

export default AddNewLink;
