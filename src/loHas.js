// аналог lodash.has()

export const loHas = (obj, path) => {
	const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

	return !!pathArray?.reduce((prevObj, key) => prevObj && prevObj[key], obj)
}

module.exports = { loHas };
