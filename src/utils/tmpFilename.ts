export function tmpFilename(uri: string, lastUpdate: number) {
    return `${uri}?t=${lastUpdate}`
}
