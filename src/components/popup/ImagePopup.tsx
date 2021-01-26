import React, {FC} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../../store";
import {loadFullImage} from "../../store/actions/image";
import {Spinner} from "../shared/Spinner";
import './ImagePopup.css'
import ImagePopupContent from "./ImagePopupContent";
import ImagePopupWrapper from "./ImagePopupWrapper";

const ImagePopup: FC<ImagePopupProps> =
    ({
         loadImage,
         currentImage,
         isLoading,
         imageList
     }) => {
        let {id} = useParams<{ id: string }>();

        if (currentImage?.id !== id || isLoading) {
            loadImage(id)
        }

        return (
            <ImagePopupWrapper>
                {
                    imageList.length && !!currentImage && !isLoading
                        ? <ImagePopupContent image={currentImage} imageList={imageList}/>
                        : <Spinner isActive={isLoading}/>

                }
            </ImagePopupWrapper>
        );
    }


const mapStateToProps = (state: AppState) => {
    const {images} = state;
    const {isLoadingFull, fullImage, list} = images
    return {
        isLoading: isLoadingFull,
        currentImage: fullImage,
        imageList: list
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, {}, any>) => {
    return {
        loadImage: (id: string) => dispatch(loadFullImage(id))
    }
}

type ImagePopupProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ImagePopup)
