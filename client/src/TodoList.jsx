import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:9000";

class TodoList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			task: "",
			items: [],
		};
	}
	componentDidMount() {
		this.getTask();
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		return (
			<div>
				<div className="row">
					<Header className="header" as="h2" color="yellow">
						To do List
					</Header>
				</div>
				<div ClassName="row">
					<Form onSubmit={this.onSubmit}>
						<Input
							type="text"
							name="task"
							onChange={this.onChange}
							value={this.state.task}
							fluid
							placeholder="Create Task"
						></Input>
						{/*<Button>Create Task</Button> */}
					</Form>
				</div>
				<div className="row">
					<Card.Group>{this.state.items}</Card.Group>
				</div>
			</div>
		);
	}
}

export default TodoList;
