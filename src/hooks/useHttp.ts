export const useHttp = () => {
    const request = async (url: string, body?: any, method = 'GET') => {
        const headers = {
            'Content-Type': 'application/json',
        }

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(url, { method, body, headers })

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`,
                )
            }

            const data = await response.json()

            return data
        } catch (e) {
            throw e
        }
    }

    return { request }
}
