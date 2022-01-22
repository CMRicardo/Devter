import { colors, fonts } from '../../styles/theme'

export default function Button ( { children, onClick } ) {
	return (
		<>
			<button onClick={ onClick }>{ children }</button>
			<style jsx>
				{ `
					button {
						align-items: center;
						gap: 0.5rem;
						background-color: ${colors.black};
						border-radius: 9999px;
						border: none;
						color: ${colors.white};
						cursor: pointer;
						display: flex;
						font-family: ${fonts.base};
						font-size: 1rem;
						font-weight: 700;
						padding: 0.5rem 1rem;
						transition: opacity 0.3s ease;
					}
					button:hover {
						opacity: 0.8;
					}
				`}
			</style>
		</>
	)
}
