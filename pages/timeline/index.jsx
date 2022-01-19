import Link from 'next/link'

export default function Timeline({ username = '@jhondoe' } = {}) {
	return (
		<div className='container'>
			<h1>This is {username}&apos;s timeline</h1>
			<Link href='/'>Home</Link>
			<style jsx>
				{`
					h1 {
						color: crimson;
						text-align: center;
					}
				`}
			</style>
		</div>
	)
}

Timeline.getInitialProps = () => {
	return fetch('http://localhost:3000/api/hello').then(res => res.json())
}
