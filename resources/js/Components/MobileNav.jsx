import { 
    IconButton,
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
    Input,
    InputGroup,
    InputLeftElement,
    Avatar
} from "@chakra-ui/react";

import {
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi';

import { timeSince } from '@/Helpers/timeSince';

import { BsFillSunFill } from "react-icons/bs";
import { FaLanguage, FaMoon } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { FaBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaCoins } from "react-icons/fa6";

export const MobileNav = ({ onOpen, ...rest }) => {
    const { auth, cosmetic } = usePage().props;
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
                fontWeight="bold"
            >
                Mobile JKN
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                {/* search input with search icon */}
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        color={useColorModeValue("gray.600", "gray.700")}
                        children={<IoSearch />}
                    />
                    <Input
                        type="text"
                        placeholder="Cari disini"
                        borderRadius={"2xl"}
                    />
                </InputGroup>

                <Flex alignItems={"center"} gap={2}>
                    <Box
                        display={{ base: "none", md: "flex" }}
                        alignItems="center"
                        mr={2}
                    >
                        {/* coins */}
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="notification"
                            color={"yellow.400"}
                            icon={<FaCoins />}
                        />

                        <Text
                            fontSize="sm"
                            color="yellow.400"
                            fontWeight="bold"
                        >
                            {auth.user.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </Text>
                    </Box>

                    <Box display={{ base: "none", md: "block" }}>
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="toggle color mode"
                            color={useColorModeValue("gray.600", "gray.200")}
                            icon={
                                colorMode === "light" ? (
                                    <FaMoon />
                                ) : (
                                    <BsFillSunFill />
                                )
                            }
                            onClick={toggleColorMode}
                        />
                    </Box>

                    <Box display={{ base: "none", md: "block" }}>
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="notification"
                            color={useColorModeValue("gray.600", "gray.200")}
                            icon={<FaBell />}
                        />
                    </Box>
                </Flex>

                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <div
                                    style={{
                                        position: "relative",
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={cosmetic.border ? cosmetic.border.item.image : "http://127.0.0.1:8000/storage/cosmetics/borders/border2.png"}
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
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            zIndex: 0, // Places avatar behind the border
                                        }}
                                        src={
                                            auth.user.avatar
                                                ? auth.user.avatar
                                                : "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg"
                                        }
                                    />
                                </div>

                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">
                                        {capitalizeFirstLetter(auth.user.name.split(" ")[0])}
                                    </Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {capitalizeFirstLetter(auth.user.role)}
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
                            <Link href={auth.user.role === "pasien" ? route("pasien.user", auth.user.id) : "#"}>
                                <MenuItem>Profil</MenuItem>
                            </Link>
                            <MenuItem>Pengaturan</MenuItem>
                            <MenuDivider />
                            <Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.removeItem("user");
                                    window.location.href = "/auth/logout";
                                }}
                            >
                                <MenuItem>Keluar</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
