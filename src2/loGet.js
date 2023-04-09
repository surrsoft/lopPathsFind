// аналог lodash.get
export function loGet (obj, path, defValue) {
	if (!path) return undefined
	const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
	const result = pathArray.reduce(
		(prevObj, key) => prevObj && prevObj[key],
		obj
	)
	return result === undefined ? defValue : result
}

module.exports = { loGet }
