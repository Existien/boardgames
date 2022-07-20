const bggApiBase = "https://boardgamegeek.com/xmlapi2"

export const getCollectionUrl = (user: string) => (
    `${bggApiBase}/collection?`
    +new URLSearchParams({
        username: user,
        stats: "1",
    }).toString()
)

export const getBoardgameUrl = (ids: Array<string>) => (
    `${bggApiBase}/thing?`
    +new URLSearchParams({
        id: ids.join(","),
        stats: "1"
    })
)