'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Image, Input, InputGroup, InputRightElement, Progress, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Badge, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure, useToast } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { BsLightningFill } from "react-icons/bs";
import { FaRegUserCircle, FaTags  } from "react-icons/fa";
import React from 'react';
import { useForm } from "@inertiajs/react";

export default function Index({ types, items }) {
	const { auth } = usePage().props;
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = React.useRef()
	const toast = useToast();
 
	const [active, setActive] = useState("all");
	const [filteredItems, setFilteredItems] = useState(items);
	const { data, setData, post, processing, errors } = useForm({
		item_id: ""
	});

	const icons = [
		{
			"nama": "Border",
			"icon": <FaRegUserCircle size={"23"} color={"#F6E05E"} />
		}, 
		{
			"nama": "Name Tag",
			"icon": <FaTags size={"23"} color={"#F6E05E"} />
		}
	]

	useEffect(() => {
		if (active == "all") {
			setFilteredItems(items);
		}

		else {
			const filtered = items.filter(item => item.type.name == active);
			console.log(filtered);
			setFilteredItems(filtered);
		}
	}, [active]);

	const handlePurchase = async (e) => {
		e.preventDefault();
		await post(route("pasien.store.purchase"), {
			onSuccess: () => {
				toast({
					title: "Pembelian Berhasil",
					description: "Anda berhasil membeli item ini.",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});

				onClose();
			}, onError: (error) => {
				console.log(error);
				toast({
					title: "Pembelian Gagal",
					description: error[0],
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});

				onClose();
			}
		});
	}

    return (
        <LayoutDashboard>
            <Card borderRadius={"xl"} p={10}>
				<Text fontSize={"2xl"} fontWeight={"bold"}>Kategori</Text>
				<Flex alignItems={"center"} justifyContent={"start"} mt={5} gap={7}>
					{types.map((type, index) => (
						<Box key={index} borderRadius={"20%"} width={"120px"} height={"120px"} bg={active == type.name ? "yellow.300" : "white"} color={active == type.name ? "white" : "black"} shadow={"lg"} border={active == type.name ? "1px solid #F6E05E" : "1px solid #E2E8F0"} cursor={"pointer"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDir={"column"} onClick={() => setActive(type.name)}>
							<Box borderRadius={"full"} width={"50px"} height={"50px"} bg={active == type.name ? "white" : "yellow.100"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
								{icons[index].icon}
							</Box>

							<Text fontSize={"lg"} fontWeight={"bold"} mt={2}>{type.name}</Text>
						</Box>
					))}
				</Flex>
            </Card>

			<Card borderRadius={"xl"} p={10} mt={5}>
				<Text fontSize={"2xl"} fontWeight={"bold"}>Katalog</Text>

				{/* shop items */}
				<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={5} mt={5}>
					{filteredItems && filteredItems.map(item => (
						<Card borderRadius={"xl"} p={5} bg={"white"} shadow={"lg"} variant={"outline"}>
							<Image src={item.image} width={"60%"} height={"auto"} mx={"auto"} />
							<Flex alignItems={"center"} justifyContent={"space-between"} mt={4} textAlign={"center"} py={1}>
								<Text fontSize={"lg"} fontWeight={"bold"}>{item.name}</Text>
								<Badge colorScheme={"yellow"} fontSize={"xs"}>{item.price} Koin</Badge>
							</Flex>

							<Button bg={"yellow.300"} size={"sm"} mt={4} width={"100%"} color={"white"} _hover={{ bg: "yellow.400" }} onClick={() => {
								setData({...data, item_id: item.id});
								onOpen();
							}}>Beli</Button>
						</Card>
					))}
				</SimpleGrid>

				{!filteredItems || filteredItems.length == 0 && (
					<Text fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>Tidak ada barang yang ditemukan</Text>
				)}
            </Card>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Konfirmasi Pembelian
					</AlertDialogHeader>

					<AlertDialogBody>
						Apakah anda yakin ingin membeli item ini?
					</AlertDialogBody>

					<AlertDialogFooter>
					<Button ref={cancelRef} onClick={onClose}>
						Cancel
					</Button>
					<Button isLoading={processing} ms={2} w={"20%"} bg={"yellow.300"} size={"md"} color={"white"} _hover={{ bg: "yellow.400" }} onClick={handlePurchase}>
						Beli
					</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
        </LayoutDashboard>
    );
}
