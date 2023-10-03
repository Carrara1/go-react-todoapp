import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:9000";
const root = createRoot(document.getElementById("root"));

class TodoList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			task: "",
			items: [],
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.getTask();
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = () => {
		let { task } = this.state;

		if (task) {
			axios
				.post(
					endpoint + "/api/task",
					{
						task,
					},
					{
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
					}
				)
				.then((res) => {
					this.getTask();
					this.setState({
						task: "",
					});
					console.log(res);
				});
		}
	};

	getTask = () => {
		axios.get(endpoint + "/api/task").then((res) => {
			if (res.data) {
				this.setState({
					items: res.data.map((item) => {
						let color = "red";
						let style = {
							wordWrap: "break-word",
						};

						if (item.status) {
							color = "green";
							style["textDecorationLine"] = "line-through";
						}
						return (
							<Card key={item._id} color={color} fluid className="rough">
								<Card.Content>
									<Card.Header textAlign="left">
										<div style={style}>{item.task}</div>
									</Card.Header>
									<Card.Meta textAlign="right">
										<Icon
											name="check circle"
											color="blue"
											onClick={() => this.updateTask(item._id)}
										/>
										<span style={{ paddingRight: 10 }}>Undo</span>
										<span style={{ paddingRight: 10 }}>Delete</span>
									</Card.Meta>
								</Card.Content>
							</Card>
						);
					}),
				});
			} else {
				this.setState({
					items: [],
				});
			}
		});
	};

	updateTask = (id) => {
		axios
			.put(endpoint + "/api/task/" + id, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((res) => {
				console.log(res);
				this.getTask();
			});
	};
	undoTask = (id) => {
		axios
			.put(endpoint + "/api/task/" + id, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((res) => {
				console.log(res);
				this.getTask();
			});
	};

	deleteTask = (id) => {
		axios
			.delete(endpoint + "/api/task/" + id, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((res) => {
				console.log(res);
				this.getTask();
			});
	};
}

root.render(
	<div>
		<Header className="header" as="h2" color="yellow">
			To do List
		</Header>
		<div className="row">
			<Form onSubmit={this.onSubmit}>
				<Input
					type="text"
					label="Create Task"
					onChange={this.onChange}
					value={this.state.task}
					placeholder="Create Task"
				></Input>
			</Form>
		</div>
		<div className="row">
			<Card.Group items={this.state.items}></Card.Group>
		</div>
	</div>
);

export default TodoList;
