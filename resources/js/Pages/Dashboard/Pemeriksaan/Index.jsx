'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Button, Card, CardBody, CardHeader, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { FaPlus, FaSearch } from "react-icons/fa";


export default function Index() {
    return (
        <LayoutDashboard>
            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" gap={5}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaSearch style={{ color: '#4a5568' }} />}
                            />
                            <Input type="text" placeholder="Cari Data Pemeriksaan" />
                        </InputGroup>
                        <Link href={route('pemeriksaan.create')}>
                            <Button colorScheme="brand" size={"md"}>
                                <FaPlus style={{ marginRight: 10 }} size={15} />
                                Pemeriksaan
                            </Button>
                        </Link>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>Table Pemeriksaan</Text>
                </CardBody>
            </Card>
        </LayoutDashboard>
    );
}