import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

function EditTask() {
    const { id } = useParams();
    const [task, setTask] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        axios.get(`/api/task/${id}`).then((response) => setTask(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const task = {
            title: formData.get("title"),
            description: formData.get("description"),
            status: formData.get("status"),
        };

        axios.post(`/api/task/update/${id}`, task).then((response) => {
            setStatus(response.data.status);
        });
    };

    if (!task) return null;

    return (
        <Layout title="Edit task">
            <form onSubmit={handleSubmit}>
                { status.length > 0 && <div className="alert alert-info text-center"> {status} </div> }
                <label className="mt-3">Title</label>
                <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={task.title}
                />

                <label className="mt-3">Description</label>
                <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="Description"
                    defaultValue={task.description}
                />

                <label className="mt-3">Status</label>
                <select
                    className="form-control"
                    name="status"
                    placeholder="Status"
                >
                    <option value="0"> En cours </option>
                    <option value="1"> Terminé </option>
                </select>

                <button className="btn btn-info mt-4 mb-4 w-100" type="submit">
                    Update
                </button>
            </form>
        </Layout>
    );
}

export default EditTask;
