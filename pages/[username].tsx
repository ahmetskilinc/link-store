import axios from "axios";
import type { GetServerSideProps } from "next";
import Link from "next/link";

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
						<Link href={link}>
							<a>{title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { username } = context.query;
	const user = (await axios.get(`${process.env.APP_URL}/api/Users/${username}`)).data.data;
	return {
		props: {
			user,
		},
	};
};

export default Home;
