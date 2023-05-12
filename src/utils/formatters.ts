export function formatDate(d: Date) {
	return new Intl.DateTimeFormat(navigator.language, {
		dateStyle: 'medium',
		timeStyle: 'short',
		// timeStyle: 'medium',
	}).format(d);
}

export function stringify(data: unknown, replacer = null, tab = 2) {
	return JSON.stringify(data, replacer, tab);
}
