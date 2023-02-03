import styled from "styled-components";
import {SM} from "../../constants/media";

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	height: 2rem;
	position: sticky;
	top: 0;
    border-radius: 0 0 0.5rem 0.5rem;
	background-color: rgba(1, 87, 155, 0.5);
	padding: 0.5rem;
	backdrop-filter: blur(5px);
	* {
		background-color: rgba(225, 245, 254, 0.7);
		border-radius: 30px;
      	border: 0;
	  	outline: inherit;
    }
	*:active {
		outline: inherit;
	}
	@media screen and (max-width: ${SM}) {
		flex-direction: column;
		height: auto;
		* {
			height: 30px;
			background-color: rgba(225, 245, 254, 0.7);
			border-radius: 30px;
			border: 0;
		}
		input[type="text"] {
			box-sizing: border-box;
			padding-left: 15px;
      	}
	}
`;