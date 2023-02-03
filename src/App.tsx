import React, { useEffect, useState, useMemo} from "react";
import {createGlobalStyle} from 'styled-components'
import { StringsGenerator } from "./helpers/string-generator";
import {Header} from "./compnents/Header/Header";
import {ListContainer} from "./compnents/List/ListContainer";
import {MD} from "./constants/media";

const GlobalStyles = createGlobalStyle`
	html {
		background-color: #E1F5FE;
	}
	body {
		margin: auto;
    	max-width: 900px;
    	min-height: 100vh;
		font-family: 'Arial, Helvetica, Arimo',serif;
	}
    @media screen and (max-width: ${MD}) {
	  body {
        margin-left: 10px;
        margin-right: 10px;
	  }
    }
`;

export const App = () => {
	const [strings, setStrings] = useState<string[]>([]);
	const listRefs = useMemo(() => Array.from({length: strings.length}, () => React.createRef() as React.MutableRefObject<HTMLLIElement>), [strings.length]);

	useEffect(() => {
		const generator = new StringsGenerator();
		generator.init(600).then(() => setStrings(generator.strings));
	}, []);

	return (<>
		<GlobalStyles/>
		<div className="App">
			<Header listRefs={listRefs}/>
			<ListContainer>
				<ol>
					{strings.map((v, i) => (
						<li ref={listRefs[i]} key={i}>{v}</li>
					))}
				</ol>
			</ListContainer>
		</div>
	</>);
};
