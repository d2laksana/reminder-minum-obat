'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Input, InputGroup, InputRightElement, Progress, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { BsLightningFill } from "react-icons/bs";
import { UserCard } from "@/Components/UserCard";

export default function List({ users }) {
	const { auth } = usePage().props;
	console.log(users);

  	return (
        <LayoutDashboard>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
				{users && users.map((user, index) => (
					console.log(user),
					<Link href={route("pasien.user", user.id)}>
						<Card borderRadius={"xl"} p={5} key={index} display={"flex"} alignItems={"center"} justifyContent={"start"} flexDirection={"row"} gap={5} cursor={"pointer"}>
							<div
								style={{
									position: "relative",
									width: "100px",
									height: "100px",
									borderRadius: "50%",
									overflow: "hidden",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<img
									src={user.border ? user.border.item.image : "http://127.0.0.1:8000/storage/cosmetics/borders/border2.png"}
									alt="Border"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
										zIndex: 1,
									}}
								/>
								<Avatar
									style={{
										width: "60px",
										height: "60px",
										borderRadius: "50%",
										zIndex: 0, // Places avatar behind the border
									}}
									src={
										user.avatar
											? `${user.avatar}?v=2`
											: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
									}
								/>
							</div>
							{/* limit to 2 word */}
							<Box>
								<Text fontSize={"xl"} fontWeight={"bold"}>{user.name.split(" ")[0]} {user.name.split(" ")[1]}</Text>
								{/* username */}
								<Text fontSize={"md"} color={"gray.400"} mt={"-1"}>@{user.username}</Text>
								{/* role */}
								<Badge colorScheme="brand" variant="solid" fontSize={"xs"} mt={2}>{user.role}</Badge>
							</Box>
						</Card>
					</Link>
				))}
			</SimpleGrid>
        </LayoutDashboard>
    );
}
