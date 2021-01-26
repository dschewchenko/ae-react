import {AnyAction} from "redux";

const initialState: ImageState = {
    list: [],
    currentPage: 0,
    pageCount: -1,
    isLoading: false,
    isLoadingFull: false,
    fullImage: null
}

export const ADD_IMAGES = 'ADD_IMAGES'
export const SET_IMAGES_CURRENT_PAGE = 'SET_IMAGES_CURRENT_PAGE'
export const SET_IMAGES_PAGE_COUNT = 'SET_IMAGES_PAGE_COUNT'
export const SET_LOADING_IMAGES = 'SET_LOADING_IMAGES'
export const SET_LOADING_FULL_IMAGE = 'SET_LOADING_FULL_IMAGE'
export const SET_FULL_IMAGE = 'SET_FULL_IMAGE'

export default function imageReducer(
    state: ImageState = initialState,
    action: AnyAction) {
    let newState: Partial<ImageState> = {}

    switch (action.type) {
        case ADD_IMAGES: {
            const list = state.list.concat(action.list)

            newState = {list}
            break
        }
        case SET_IMAGES_CURRENT_PAGE: {
            newState = {currentPage: Number(action.page)}
            break
        }
        case SET_IMAGES_PAGE_COUNT: {
            newState = {pageCount: Number(action.pageCount)}
            break
        }
        case SET_LOADING_IMAGES: {
            newState = {isLoading: Boolean(action.isLoading)}
            break
        }
        case SET_LOADING_FULL_IMAGE: {
            newState = {isLoadingFull: Boolean(action.isLoading)}
            break
        }
        case SET_FULL_IMAGE: {
            newState = {fullImage: action.image}
            break;
        }
        default:
            return state
    }

    return Object.assign({}, state, newState)
}

export type ImageState = {
    list: ImagePreviewItem[],
    currentPage: number,
    pageCount: number,
    isLoading: boolean,
    isLoadingFull: boolean,
    fullImage: ImageFullItem | null
}

export type ImagePreviewItem = {
    id: string,
    cropped_picture: string
}

export type ImageFullItem = {
    id: string,
    author: string
    camera: string
    cropped_picture: string
    full_picture: string
    tags: string
}
