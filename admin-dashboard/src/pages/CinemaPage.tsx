import React from "react";
import CinemaList from "../pages/CinemaList";

const CinemaPage: React.FC = () => {
    return (
        <div className="container">
            <h1>Cinema Management</h1>
            <CinemaList />
        </div>
    );
};

export default CinemaPage;
