import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Grid,
	Card,
	Typography,
	CardContent,
	TextField,
	Button,
	CircularProgress,
} from "@mui/material";

const TaskForm = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [task, setTask] = useState({
		title: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);

	const handleChange = (e) => {
		setTask({
			...task,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		try {
			if (editing) {
				await fetch(`http://localhost:4000/tasks/${params.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
			} else {
				const response = await fetch("http://localhost:4000/tasks", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
				await response.json();
			}

			setLoading(false);

			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	const loadTask = async (id) => {
		const response = await fetch("http://localhost:4000/tasks/" + id);
		const data = await response.json();

		setTask({ title: data.title, description: data.description });
		setEditing(true);
	};

	useEffect(() => {
		if (params.id) {
			loadTask(params.id);
		}
	}, [params.id]);

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<Grid item xs={4}>
				<Card
					sx={{ mt: 5 }}
					style={{
						backgroundColor: "rgb(43, 43, 43)",
						padding: "1rem",
					}}
				>
					<Typography
						textAlign="center"
						color="white"
						fontWeight="bold"
						fontSize="1.5rem"
					>
						{editing ? "Edit task" : "Create task"}
					</Typography>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<TextField
								variant="outlined"
								label="Write your title"
								sx={{
									display: "block",
									margin: ".5rem 0",
								}}
								value={task.title}
								color="success"
								inputProps={{
									style: { color: "white" },
								}}
								InputLabelProps={{
									style: { color: "white" },
								}}
								onChange={handleChange}
								name="title"
							/>
							<TextField
								variant="outlined"
								label="Write your description"
								multiline
								rows={4}
								x={{
									display: "block",
									margin: ".5rem 0",
								}}
								color="success"
								value={task.description}
								inputProps={{
									style: { color: "white" },
								}}
								InputLabelProps={{
									style: { color: "white" },
								}}
								onChange={handleChange}
								name="description"
							/>

							<Button
								variant="contained"
								style={{
									display: "block",
									margin: "0 auto",
									marginTop: "1rem",
								}}
								color="success"
								type="submit"
								disabled={!task.title || !task.description}
							>
								{loading ? <CircularProgress size={24} /> : "Save"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default TaskForm;
