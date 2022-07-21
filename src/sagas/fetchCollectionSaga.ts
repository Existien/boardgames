import { Action, createAction } from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import { getBoardgameUrl, getCollectionUrl } from '../api';
import { Collection, Game, setCollection, setIsReady } from '../features/CollectionView/slice';
import { limit } from '../plots';

export const fetchCollection = createAction<{user: string}>('fetchCollection');

function* fetchCollectionHandler(action: Action) {
    if (!fetchCollection.match(action)) return;

    let collection: Collection = yield call(getCollection, action.payload.user)

    collection = yield call(addPolls, collection, limit);
    yield put(setCollection(collection))
    yield put(setIsReady())
}

export function* fetchCollectionSaga() {
    yield takeEvery(fetchCollection.type, fetchCollectionHandler)
}

function* getCollection (user: string) {
    const items: HTMLCollectionOf<Element> = yield fetchItems(getCollectionUrl(user))
    const collection: Collection = []
    for (let i=0; i<items.length;++i) {
        collection.push(elementToGame(items[i]))
    }
    return collection
}

function* addPolls (collection: Collection, entryLimit: number) {
    const ids = collection.map((game)=>game.objectId);
    const items: HTMLCollectionOf<Element> = yield fetchItems(getBoardgameUrl(ids))
    const enrichedCollection = []
    for (const game of collection) {
        const item = getItemWithId(items, game.objectId)
        if (item === undefined) {
            enrichedCollection.push(game)
            console.log(`No details for ${game.name}`)
            continue;
        }

        const poll = getPoll(item, 'suggested_numplayers')
        if (poll === undefined) {
            enrichedCollection.push(game)
            continue;
        }

        const parsedPoll = parsePoll(poll)
        const enrichedGame: Game = {
            ...game,
            bestWith: Object.entries(parsedPoll['Best']).sort((a,b)=>Number(b[1])-Number(a[1]))[0][0],
            recommended: prunePoll(sumPolls(parsedPoll['Recommended'], parsedPoll['Best']), entryLimit),
            notRecommended: prunePoll(parsedPoll['Not Recommended'], entryLimit),
        }
        enrichedCollection.push(enrichedGame)
    }
    return enrichedCollection
}

const sumPolls = (pollA: {[key: string]: Number}, pollB: {[key: string]: Number}): {[key: string]: Number} => {
    const summed: {[key: string]: Number} = {}
    for (const [key, numA] of Object.entries(pollA)) {
        if (pollB[key] === undefined) {
            summed[key] = numA
        } else {
            summed[key] = Number(numA.valueOf() + pollB[key].valueOf())
        }
    }
    return summed
}

interface ParsedPoll {
    [category: string]: {
        [numPlayers: string]: Number
    }
}
const parsePoll = (elements: HTMLCollectionOf<Element>): ParsedPoll => {
    const parsed: ParsedPoll = {}
    for (let i=0;i<elements.length;++i) {
        const poll = elements.item(i)
        if (poll === null) continue;
        const numPlayers = poll.getAttribute('numplayers')
        if (numPlayers === null) continue;
        const results = poll.getElementsByTagName('result')
        for (let j=0;j<results.length;++j) {
            const result = results[j];
            const category = result.getAttribute('value');
            const numVotes = result.getAttribute('numvotes');
            if (category === null || numVotes ===  null) continue;
            if (parsed[category] === undefined) {
                parsed[category] = {}
            }
            parsed[category][numPlayers] = Number(numVotes)
        }
    }
    return parsed
}

const prunePoll = (poll: {[key: string]: Number}, limit: number): {[key: string]: Number} => {
    const prunedEntries = Object.entries(poll).sort((a, b)=>(Number(b[1])-Number(a[1]))).slice(0, limit)
    return Object.fromEntries(prunedEntries.filter(([key, votes]) => votes>0))
}

const getPoll = (element: Element, pollName: string): HTMLCollectionOf<Element>|undefined => {
    const polls = element.getElementsByTagName('poll');
    for (let i=0;i<polls.length;++i) {
        if (polls[i].getAttribute('name') === pollName) {
            return polls[i].getElementsByTagName('results')
        }
    }
}

const getItemWithId = (items: HTMLCollectionOf<Element>, id: string): Element|undefined => {
    for (let i=0; i<items.length; ++i) {
        if (items[i].getAttribute('id') === id) {
            return items[i]
        }
    }
}

function* fetchItems (url: string) {
    const response: Response = yield call(fetch, url)
    const rawText: string = yield call(response.text.bind(response))
    const data = new window.DOMParser().parseFromString(rawText, "text/xml")
    return data.getElementsByTagName('items')[0].getElementsByTagName('item')
}

const elementToGame = (element: Element): Game => {
    return {
        name: getName(element),
        userRating: getUserRating(element),
        bggRank: getBggRank(element),
        minPlayers: getMinPlayers(element),
        maxPlayers: getMaxPlayers(element),
        image: getImage(element),
        objectId: getObjectId(element)
    }
}

const getObjectId = (element: Element): string => {
    const id = element.getAttribute('objectid')
    return (id === null ? "N/A" : id)
}

const getImage = (element: Element): string => {
    const image = element.getElementsByTagName('thumbnail')[0].textContent
    return (image === null ? "N/A" : image)
}

const getMinPlayers = (element: Element): Number => Number(
    element
        .getElementsByTagName('stats')[0]
        .getAttribute('minplayers')
)

const getMaxPlayers = (element: Element): Number => Number(
    element
        .getElementsByTagName('stats')[0]
        .getAttribute('maxplayers')
)

const getName = (element: Element): string => {
    const name = element.getElementsByTagName('name')[0].textContent
    return (name === null ? "N/A" : name)
}

const getUserRating = (element: Element): number => Number(
    element
        .getElementsByTagName('stats')[0]
        .getElementsByTagName('rating')[0]
        .getElementsByTagName('average')[0]
        .getAttribute('value')
)

const getBggRank = (element: Element): number => {
    const ranks = element
        .getElementsByTagName('stats')[0]
        .getElementsByTagName('rating')[0]
        .getElementsByTagName('ranks')[0]
        .getElementsByTagName('rank');
        
    for (let i=0; i<ranks.length; ++i) {
        const rank = ranks.item(i);
        if (rank?.attributes.getNamedItem('name')?.nodeValue === "boardgame") {
            return Number(rank.getAttribute('value'))
        }
    }
    return -1
}