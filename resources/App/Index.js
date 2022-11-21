class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };

        this.Task = this.Task.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    componentDidMount() {
        $.ajax({
            url: "/api/task/all",
            accepts: "json",
            success: (data) => this.setState({ tasks: data }),
        });
    }

    deleteTask(taskId) {
        $.ajax({
            url: `/api/task/${taskId}`,
            type: "DELETE",
            success: () => window.location.reload(false),
        });
    }

    Task({ task }) {
        return (
            <li>
            <div>
                <span> {task.title} - </span>
                <button onClick={() => this.deleteTask(task.id)}> Delete </button>
            </div>
            </li>
        );
    }

    render() {
        return (
            <>
                <Form />
                <br />
                <ul>
                    {this.state.tasks.map((task, index) => (
                        <this.Task key={index} task={task} />
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

        let task = {
            title: formData.get("title"),
            description: formData.get("description"),
        };

        $.ajax({
            url: "/api/task/create",
            method: "POST",
            data: task,
            success: () => window.location.reload(false),
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <br />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                />
                <br />
                <button type="submit"> Create </button>
            </form>
        );
    }
}

const Index = () => (
    <Tasks/>
    );
// class TestForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();

//         let formData = new FormData(e.target);
//         console.log('Name: ' + formData.get('name'))
//         console.log('Description: ' + formData.get('description'))
//     };

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <input type="text" name="name" placeholder="Title" />
//                 <br />
//                 <input
//                     type="text"
//                     name="description"
//                     placeholder="Description"
//                 />
//                 <br />
//                 <button type="submit"> Submit </button>
//             </form>
//         );
//     }
// }

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Index />);
