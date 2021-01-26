import React, {FC} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import InfiniteScroll from "../shared/InfiniteScroll";
import {AppState} from "../../store";
import {Spinner} from "../shared/Spinner";
import {loadImages} from "../../store/actions/image";
import {ImagePreview} from "./ImagePreview";

import './ImagesGallery.css'

const ImagesGallery: FC<ImageGalleryProps> =
    ({isLoading, imagesList, onScroll}) => (
        <InfiniteScroll margin={50} onScroll={onScroll}>
            <div className="ImagesGallery">
                {imagesList.map((image, i) => (
                    <ImagePreview image={image} key={image.id}/>
                ))}
            </div>
            <Spinner isActive={isLoading}/>
        </InfiniteScroll>
    )


const mapStateToProps = (state: AppState) => {
    const {images} = state;
    const {list, isLoading} = images
    return {
        imagesList: list,
        isLoading
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, {}, any>) => {
    return {
        onScroll: () => dispatch(loadImages())
    }
}

type ImageGalleryProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
export default connect(mapStateToProps, mapDispatchToProps)(ImagesGallery)
