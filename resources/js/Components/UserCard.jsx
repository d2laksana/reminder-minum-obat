import * as React from 'react';
import {
    Box,
    Heading,
    Text,
    HStack,
    VStack,
    Icon,
    Divider,
	Avatar,
	Badge
} from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaDev, FaLinkedin, FaSearch } from "react-icons/fa";

export const UserCard = ({ user }) => {
  	return (
        <Box
            maxW="lg"
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
			margin={"auto"}
            boxShadow="md"
            bg="white"
            p={6}
            textAlign="center"
        >
            <VStack>
                <div
                    style={{
                        position: "relative",
                        width: "220px",
                        height: "220px",
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
							width: "160px",
							height: "160px",
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

                <Heading fontSize="2xl" fontWeight="bold">
                    {user.name}
                </Heading>

                <Text fontSize="md" color="gray.400">
                    @{user.username}
                </Text>

				<Badge colorScheme={"yellow"} fontSize={"xs"}>{user.coins} Koin</Badge>
            </VStack>
        </Box>
    );
};
