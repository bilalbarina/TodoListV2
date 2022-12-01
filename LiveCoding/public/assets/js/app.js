class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        axios.get("http://localhost/api/task/all").then((response) =>
            this.setState({
                tasks: response.data,
            })
        );
    }

    deleteTask(id) {
        axios.delete(`http://localhost/api/task/${id}`).then((response) => {
            alert(response.data.status)
            location.reload()
        })
    }

    render() {
        return (
            <>
                <Form />
                <ul>
                    {this.state.tasks.map((task, i) => (
                        <li key={i}>
                        {task.title}
                        <button onClick={() => this.deleteTask(task.id)}> Delete </button>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        let data = {
            title: formData.get("title"),
        };

        axios
            .post("http://localhost/api/task/create", data)
            .then((response) => alert(response.data.status));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="title" placeholder="Title" required />
                <button type="submit"> Create </button>
            </form>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Tasks />);
