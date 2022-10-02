// Disabling for ES5 compatibility
/* eslint-disable unicorn/prefer-string-slice */
export type Scale = 1 | 2 | 3;

const _scales: Scale[] = [1, 2, 3];

export function srcx(
	src: string,
	options?: { scales?: Scale[]; forceScale?: Scale }
): { src: string; srcSet?: string } {
	const { scales = _scales, forceScale } = options ?? {};
	if (forceScale === 1 || scales.length === 0) {
		return { src };
	}

	let url: URL;
	let isRelative = false;
	try {
		url = new URL(src);
	} catch {
		// Could be a relative URL. Try again with a base URL that should allow it.
		url = new URL(src, "file://");
		isRelative = true;
	}

	if (url.pathname.substr(-4) === ".svg") {
		return { src };
	}

	//     https://www.google.com/logos/google.jpg
	// [protocol]  [  hostname  ][ dir ][name][ext]
	const lastSlash = url.pathname.lastIndexOf("/");
	const extIndex = url.pathname.lastIndexOf(".");
	const ext = extIndex === -1 ? "" : url.pathname.substr(extIndex);
	const dir = lastSlash === -1 ? "" : url.pathname.substr(0, lastSlash + 1);
	const name = url.pathname.substr(lastSlash + 1, extIndex - lastSlash - 1);

	const initialScale = forceScale === undefined ? 1 : forceScale;
	url.pathname = `${dir}${name}${initialScale <= 1 ? "" : `@${initialScale}x`}${ext}`;
	const baseSrc = url.href.substr(isRelative ? 7 : 0);
	const srcSet: string[] = [];
	for (const scale of scales) {
		if (scale === initialScale || scale <= (forceScale || 0)) {
			continue;
		}
		url.pathname = `${dir}${name}@${scale}x${ext}`;
		srcSet.push(`${url.href.substr(isRelative ? 7 : 0)} ${scale}x`);
	}

	return {
		src: baseSrc,
		// Ignoring this lint warning to save a few bytes.
		// eslint-disable-next-line unicorn/require-array-join-separator
		srcSet: srcSet.length > 0 ? srcSet.join() : undefined
	};
}
