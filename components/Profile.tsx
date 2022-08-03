import React from "react";
import LoginButton from "./LoginButton";

type Props = { user: any };

const Profile = ({ user }: Props) => {
	return (
		<div>
			<h1>Your Profile</h1>
			<p>{user.name}</p>
			<p>{user.email}</p>
			<p>{user.username}</p>
			<LoginButton />
			<div>
				<h2>Your Links</h2>
				{user.links?.length > 0 ? (
					<ul>
						{user.links.map(({ link, title }: { link: string; title: string }) => (
							<li key={`${link}${title}`}>
								<a href={link}>{title}</a>
							</li>
						))}
					</ul>
				) : (
					<p>You have no links yet. Add one below!</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
