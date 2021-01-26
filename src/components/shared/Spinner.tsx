import React, {FC} from "react";
import './Spinner.css'

export const Spinner: FC<SpinnerProps> = ({isActive}) => (
    <>
        {isActive && <div className="Spinner">
            <div className="Spinner__double-bounce1"/>
            <div className="Spinner__double-bounce2"/>
        </div>}
    </>
);

export type SpinnerProps = { isActive: boolean }
