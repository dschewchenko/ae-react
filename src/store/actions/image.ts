import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../index";
import {
    ADD_IMAGES,
    SET_IMAGES_CURRENT_PAGE,
    SET_IMAGES_PAGE_COUNT,
    SET_LOADING_IMAGES,
    SET_LOADING_FULL_IMAGE,
    ImagePreviewItem, ImageFullItem, SET_FULL_IMAGE
} from "../reducers/image";
import {Action, Dispatch} from "redux";
import {loginUser} from "./user";

const API_URL = process.env.REACT_APP_API_URL

export function setLoadingImages(isLoading: boolean) {
    return (dispatch: Dispatch) => dispatch({
        type: SET_LOADING_IMAGES,
        isLoading
    })
}

export function setLoadingFullImage(isLoading: boolean) {
    return (dispatch: Dispatch) => dispatch({
        type: SET_LOADING_FULL_IMAGE,
        isLoading
    })
}

async function loadImagesFromApi(page: string, token: string): Promise<ImagesListResponse> {
    const url = new URL(`${API_URL}/images`)
    url.search = new URLSearchParams({page}).toString()
    const response = await fetch(url.toString(), {
        headers: {'Authorization': `Bearer ${token}`}
    })
    return await response.json()
}

async function loadFullImageFromApi(id: string, token: string): Promise<ImageFullItem> {
    const response = await fetch(`${API_URL}/images/${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
    return await response.json()
}

export function loadImages() {
    return async (dispatch: ThunkDispatch<AppState, void, Action>, getState: () => AppState) => {
        const {images, user} = getState()
        const {currentPage, pageCount, isLoading} = images
        let token = user.token

        if (isLoading || currentPage === pageCount) {
            return
        }

        setLoadingImages(true)

        if(!token) {
            await dispatch(loginUser())
            token = getState().user.token
        }

        try {
            const {
                pictures,
                page,
                pageCount
            } = await loadImagesFromApi(`${currentPage + 1}`, token)

            dispatch({type: SET_IMAGES_PAGE_COUNT, pageCount})
            dispatch({type: SET_IMAGES_CURRENT_PAGE, page: page})
            dispatch({
                type: ADD_IMAGES,
                list: pictures
            });
        } finally {
            setLoadingImages(false)
        }
    }
}

export function loadFullImage(id: string) {
    // SET_FULL_IMAGE
    return async (dispatch: ThunkDispatch<AppState, void, Action>, getState: () => AppState) => {
        const {images, user} = getState()
        const {isLoadingFull} = images
        let token = user.token

        if (isLoadingFull) {
            return
        }

        setLoadingFullImage(true)

        if(!token) {
            await dispatch(loginUser())
            token = getState().user.token
        }

        try {
            const image = await loadFullImageFromApi(id, token)

            dispatch({
                type: SET_FULL_IMAGE,
                image
            });
        } finally {
            setLoadingFullImage(false)
        }
    }
}

type ImagesListResponse = {
    pageCount: number,
    page: number,
    pictures: ImagePreviewItem[]
};
