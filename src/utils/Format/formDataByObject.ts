export function formDataByObject(forms: { [key: string]: any }) {
    const formatted = new FormData()
    Object.keys(forms).forEach((key) => {
        if (forms[key] != null) {
            if (Array.isArray(forms[key])) {
                forms[key].forEach((item) => {
                    formatted.append(key, item)
                })
            } else if (forms[key] instanceof Date) {
                formatted.append(key, forms[key].toISOString())
            } else {
                formatted.append(key, forms[key])
            }
        }
    })
    return formatted
}
