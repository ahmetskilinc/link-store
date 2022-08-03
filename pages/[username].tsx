import axios from "axios";
import type { GetServerSideProps } from "next";

type Props = {
	user: any;
};

const Home = (props: Props) => {
	return (
		<div>
			<p>
				{props.user.name}
				{" ("}
				{props.user.username}
				{")"}
			</p>
			<ul>
				{props.user.links.map(({ link, title }: { link: string; title: string }) => (
					<li key={`${link}${title}`}>
						<a href={link}>{title}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { username } = context.query;
	const user = (await axios.get(`http://localhost:3000/api/Users/${username}`)).data.data;
	return {
		props: {
			user,
		},
	};
};

export default Home;
