import React, {FC} from "react";
import {useHistory} from "react-router-dom";

const ImagePopupWrapper: FC = ({children}) => {
    const history = useHistory()

    return (
        <div className="ImagePopup">
            <div className="ImagePopup-backdrop" onClick={() => history.push('/')}/>
            <div className="ImagePopup-content">
                {children}
            </div>
        </div>
    )
}

export default ImagePopupWrapper
