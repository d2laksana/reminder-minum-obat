'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Input, InputGroup, InputRightElement, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { BsLightningFill } from "react-icons/bs";
import { UserCard } from "@/Components/UserCard";

export default function Index({ user }) {
	const { auth } = usePage().props;

    return (
        <LayoutDashboard>
            <UserCard user={user} />
        </LayoutDashboard>
    );
}
