import React, {FC} from 'react';
import {Route, useLocation} from 'react-router-dom';
import './App.css';
import ImagesGallery from "./components/gallery/ImagesGallery";
import ImagePopup from "./components/popup/ImagePopup";
import {connect} from "react-redux";
import {AppState} from "./store";

const App: FC<AppProps> = () => {
    const location = useLocation();

    const isPopup = /^\/image\/[^/]+$/.test(location.pathname)

    return (
        <div className="App">
            <header className="App-header">
                Super Gallery
            </header>
            <main className="App-main">
                <ImagesGallery/>
            </main>
            {isPopup && <Route path="/image/:id" children={<ImagePopup/>}/>}
        </div>
    );
};

const mapStateToProps = (state: AppState) => {
    const {user} = state;
    const {token} = user
    return {token};
};

type AppProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(App);
