'use client';

import { MobileNav } from "@/Components/MobileNav";
import { SidebarContent } from "@/Components/SidebarContent";
import { Box, Container, Drawer, DrawerContent, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Head, usePage } from "@inertiajs/react";


const LayoutDashboard = (props) => {
    const { title, user } = usePage().props;
    const { children } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Box minH="100vh" bg={useColorModeValue('#ECF8FF', 'gray.800')}>
                <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full">
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen} user={user} />
                <Box mt={8} ml={{ base: 0, md: 60 }} px="2">
                    <Container maxW="container.xl">
                        {children}
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default LayoutDashboard;