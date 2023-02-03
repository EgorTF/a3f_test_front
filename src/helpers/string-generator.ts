import { faker } from "@faker-js/faker";
import { asyncWait } from "./async-wait";

export class StringsGenerator {
	private m_strings: string[];

	constructor() {
		this.m_strings = [];
	}

	public async init(stringsCount: number) {
		await asyncWait(1000);
		this.generateStrings(stringsCount);
		await asyncWait(1000);	
	}

	public get strings() {
		return this.m_strings;
	}

	private generateStrings(stringsCount: number) {
		const realStringsCount = Math.max(stringsCount, 500);
		
		if (stringsCount !== realStringsCount) {
			console.warn(`Будет сгенерировано ${realStringsCount} строк вместо ${stringsCount}`);
		}

		this.m_strings = Array.from({ length: realStringsCount }, () => faker.name.fullName());
	}
}