class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "/api/task/all",
            accepts: "json",
            success: (data) => this.setState({ tasks: data }),
        });
    }

    render() {
        return [
            <CreateTaskForm />,
            this.state.tasks.map((task) => <Task title={task.title} />)
        ];
    }
}

const Task = (props) => {
    return (
            <li>
                { props.title }
            </li>
    );
}

const CreateTaskForm = () => {
    const refs = {
        title: React.useRef(),
        description: React.useRef(),
    };

    const submit = (event) => {
        event.preventDefault();

        const task = {
            title: refs.title.current.value,
            description: refs.description.current.value,
        };

        $.ajax({
            url: "/api/task/create",
            method: "POST",
            data: task,
            success: (data) => console.log(data),
        });

        window.location.reload(false);
    };

    return (
        <form>
            <input
                type="text"
                name="name"
                placeholder="Title"
                ref={refs.title}
            />
            <br/>
            <input
                type="text"
                name="description"
                placeholder="Description"
                ref={refs.description}
            />
            <br/>
            <button onClick={submit}> Create </button>
        </form>
    );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Index />);
