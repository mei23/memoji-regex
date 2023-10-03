import { readdirSync } from 'fs';
import { resolve } from 'path';

const notoBase = resolve(__dirname, '../../noto-emoji/svg/');

async function main() {
	const notoFiles = readdirSync(notoBase).filter(x => x.endsWith('.svg'));	// ['emoji_u002a_20e3.svg', ...]

	for (const notoFile of notoFiles) {
		const m = notoFile.match(/^emoji_u([0-9a-z_]+)\.svg$/);
		if (!m) throw `unmatch ${notoFile}`;

		let codes = m[1].split(/_/);	// ['002a', '20e3', ... ]
		codes = normalize(codes);
		const twemojiName = codes.join('-');
		console.log(`${notoFile}\t${twemojiName}`);
	}
}

function normalize(codes: string[]): string[] {
	codes = codes.map(x => x.toLowerCase());
	if (!codes.includes('200d')) {
		codes = codes.filter(x => x !== 'fe0f');
	}
	return codes;
}


main().then(() => {
	console.log('=== Done ===');
});
