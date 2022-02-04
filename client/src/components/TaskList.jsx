import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();

	const getTasks = async () => {
		try {
			const response = await fetch("http://localhost:4000/tasks");
			const data = await response.json();
			setTasks(data.data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`http://localhost:4000/tasks/${id}`, {
				method: "DELETE",
			});
			setTasks(tasks.filter((task) => task.id !== id));
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<section>
			<Typography
				fontSize="30px"
				fontWeight="bold"
				style={{
					textAlign: "center",
				}}
			>
				Task list
			</Typography>
			{tasks.map((task) => (
				<Card
					key={task.id}
					style={{
						margin: "15px",
						backgroundColor: "rgb(43, 43, 43)",
					}}
				>
					<CardContent
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<section>
							<Typography>{task.title}</Typography>
							<Typography>{task.description}</Typography>
						</section>

						<section>
							<Button
								variant="contained"
								color="primary"
								onClick={() => navigate(`/${task.id}/edit`)}
							>
								Edit
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={() => handleDelete(task.id)}
							>
								Delete
							</Button>
						</section>
					</CardContent>
				</Card>
			))}
		</section>
	);
};

export default TaskList;
