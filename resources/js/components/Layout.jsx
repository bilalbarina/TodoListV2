import React from "react";
import { ReactDOM } from "react";

export default function Layout(props) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"> {props.title} </div>

                        <div className="card-body"> {props.children} </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
