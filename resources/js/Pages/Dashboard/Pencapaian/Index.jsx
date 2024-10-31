'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Input, InputGroup, InputRightElement, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { BsLightningFill } from "react-icons/bs";

export default function Index({ logs }) {
	const { auth } = usePage().props;

    return (
        <LayoutDashboard>
            <Card borderRadius={"xl"} p={10} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
				<FaCoins size={"60"} color={"#F6E05E"} />
				<Text fontSize={"4xl"} fontWeight={"bold"} mt={2} color={"yellow.300"}>{auth.user.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>

				<Text fontSize={"2xl"} fontWeight={"bold"} mt={2}>Poin anda</Text>
				<Text fontSize={"lg"} mt={2} color={"gray.400"} width={"30%"} textAlign={"center"}>Kumpulkan lebih banyak koin untuk membuka lebih banyak kosmetik yang akan membuat tampilanmu makin menarik!</Text>
            </Card>

			<Card borderRadius={"xl"} p={10} mt={5} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
				<Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
					<Text fontSize={"2xl"} fontWeight={"bold"}>Riwayat Poin</Text>
					<Link href={route("pasien.store")}>
						<Button bg={"brand.300"} color={"white"} _hover={{ bg: "brand.400" }} size={"md"}>Tukar Poin</Button>
					</Link>
				</Flex>

				{logs && logs.map((log, index) => (
					<Flex alignItems={"center"} justifyContent={"start"} width={"100%"} mt={5}>
						{/* circle box */}
						<Box borderRadius={"full"} width={"50px"} height={"50px"} bg={"yellow.100"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
							<BsLightningFill size={"25"} color={"#F6E05E"} />
						</Box>

						<Flex flexDirection={"column"} ml={5}>
							<Text fontSize={"lg"} fontWeight={"bold"}>{log.title}</Text>
							<Text fontSize={"sm"} color={"gray.400"}>{log.coins} koin</Text>
						</Flex>
					</Flex>
				))}
            </Card>
        </LayoutDashboard>
    );
}
