import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorMode,
    Heading,
    useToast,
} from '@chakra-ui/react'

import {
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi'

import { timeSince } from '@/Helpers/timeSince';

import { BsFillSunFill } from "react-icons/bs";
import { FaLanguage, FaRegMoon } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export const MobileNav = ({ onOpen, ...rest }) => {
    const { auth } = usePage().props;
    const toast = useToast();

    const { colorMode, toggleColorMode } = useColorMode();

    function capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Nova360
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Box display={{ base: "none", md: "block" }}>
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="toggle color mode"
                        icon={
                            colorMode === "light" ? (
                                <FaRegMoon />
                            ) : (
                                <BsFillSunFill />
                            )
                        }
                        onClick={toggleColorMode}
                    />
                </Box>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    src={"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"}
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">
                                        {capitalizeFirstLetter("Naufal")}
                                    </Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {capitalizeFirstLetter("Admin")}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.700")}
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
                        >
                            <Link href="/profile">
                                <MenuItem>Profil</MenuItem>
                            </Link>
                            <MenuItem>Pengaturan</MenuItem>
                            <MenuDivider />
                            <Link onClick={
                                (e) => {
                                    e.preventDefault();
                                    localStorage.removeItem("user");
                                    window.location.href = "/auth/logout";
                                }
                            }>
                                <MenuItem>Keluar</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
}
