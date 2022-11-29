import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EditTask from "./EditTask";
import Layout from "./Layout";
import { Chart } from "chart.js/auto";
import { max } from "lodash";

function Index() {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        axios.get("/api/task/all").then((response) => setTasks(response.data));
    }, []);

    (async function () {
        if (tasks.length == 0) return;

        let data = [];
        let days = [];
        for (let i in tasks) {
            let task = tasks[i];
            let date = new Date(task.created_at);

            if (!days.includes(date.getDay())) {
                let count = tasks.reduce(
                    (s, item) =>
                        s +
                        (new Date(item.created_at).getDay() == date.getDay()),
                    0
                );

                data.push({
                    day: date.toLocaleDateString(),
                    count: count,
                });

                days.push(date.getDay());
            }
        }

        new Chart(document.getElementById("chart"), {
            type: "bar",
            data: {
                labels: data.map((data) => data.day),
                datasets: [
                    {
                        label: "Total Tasks",
                        data: data.map((data) => data.count),
                    },
                ],
            },
            options: {
                y: {
                    max: 10,
                },
            },
        });
    })();

    return (
        <Layout title="Tasks">
            <canvas id="chart"></canvas>
            <ul className="mt-4">
                {tasks.map((task, i) => (
                    <li key={i}>
                        <Link to={`/edit/${task.id}`}>{task.title}</Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

// export default Index;

if (document.getElementById("app")) {
    const Root = ReactDOM.createRoot(document.getElementById("app"));
    Root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/edit/:id" element={<EditTask />}></Route>
            </Routes>
        </BrowserRouter>
    );
}