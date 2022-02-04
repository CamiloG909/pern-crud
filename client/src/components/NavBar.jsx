import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				style={{ marginBottom: "15px", backgroundColor: "#2B2B2B" }}
			>
				<Container>
					<Toolbar>
						<Typography sx={{ flexGrow: 1 }}>
							<NavLink
								to="/"
								style={{
									textDecoration: "none",
									fontWeight: "bold",
									fontSize: "1.5rem",
									color: "#1ccc5b",
									userSelect: "none",
								}}
							>
								PERN and MUI
							</NavLink>
						</Typography>
						<Button
							variant="contained"
							color="success"
							onClick={() => navigate("/new")}
						>
							New task
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};

export default NavBar;
