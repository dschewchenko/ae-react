import React, {FC} from "react";
import {Link} from "react-router-dom";
import {ImageFullItem, ImagePreviewItem} from "../../store/reducers/image";

const ImagePopupContent: FC<ImagePopupContentProps> = ({image, imageList}) => {
    const currentIndex = imageList.findIndex(({id}) => id === image.id)
    const maxIndex = imageList.length - 1
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
    const nextIndex = currentIndex < maxIndex ? currentIndex + 1 : 0

    const prevImageId = imageList[prevIndex].id
    const nextImageId = imageList[nextIndex].id

    const currentUrl = window.location.href

    return (
        <div className="ImagePopup-content-image">
            <Link to={`/image/${prevImageId}`} className="ImagePopup-content-image__link">Prev</Link>
            <div className="ImagePopup-content-image-view">
                <div className="ImagePopup-content-image-view__image-wrap">
                    <img src={image.full_picture} alt="" className="ImagePopup-content-image-view__image"/>
                </div>
                <p className="ImagePopup-content-image-view__info"><b>Author:</b> {image.author}</p>
                <p className="ImagePopup-content-image-view__info"><b>Camera:</b> {image.camera}</p>
                <p className="ImagePopup-content-image-view__info"><b>Tags:</b> {image.tags}</p>
                <p className="ImagePopup-content-image-view__info"><b>Url:</b> <a href={currentUrl}>{currentUrl}</a></p>
            </div>
            <Link to={`/image/${nextImageId}`} className="ImagePopup-content-image__link">Next</Link>
        </div>
    );
}

type ImagePopupContentProps = {
    image: ImageFullItem
    imageList: ImagePreviewItem[]
}

export default ImagePopupContent
