import {ImagePreviewItem} from "../../store/reducers/image";
import React, {FC} from "react";
import {Link} from "react-router-dom";

export const ImagePreview: FC<ImagePreviewProps> = ({image}) => {
    return (
        <Link to={`/image/${image.id}`} className="ImagesGallery-image-wrap">
            <img src={image.cropped_picture} alt="" className="ImagesGallery--image"/>
        </Link>);
};

type ImagePreviewProps = { image: ImagePreviewItem }
