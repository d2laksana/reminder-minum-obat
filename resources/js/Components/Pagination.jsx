'use client';

import { Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";

export default function Pagination({ prescriptions }) {
    const currentPage = prescriptions.current_page;
    const lastPage = prescriptions.last_page;

    // Menentukan halaman yang akan ditampilkan
    const getPageNumbers = () => {
        const pages = [];

        // Halaman sebelumnya
        for (let i = Math.max(currentPage - 2, 1); i < currentPage; i++) {
            pages.push(i);
        }

        // Halaman aktif
        pages.push(currentPage);

        // Halaman setelahnya
        for (let i = currentPage + 1; i <= Math.min(currentPage + 2, lastPage); i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    return (
        <HStack spacing="4" justify="center">
            <Link href={prescriptions.prev_page_url} isDisabled={!prescriptions.prev_page_url}>
                <Button isDisabled={!prescriptions.next_page_url} variant={"pagination"}>
                    Sebelumnya
                </Button>
            </Link>

            {pageNumbers.map((pageNumber) => (
                <Link key={pageNumber} href={prescriptions.path + '?page=' + pageNumber}>
                    <Button colorScheme={prescriptions.current_page === pageNumber ? 'blue' : 'gray'}>
                        {pageNumber}
                    </Button>
                </Link>
            ))}

            <Link href={prescriptions.next_page_url}>
                <Button isDisabled={!prescriptions.next_page_url} variant={"pagination"}>
                    Selanjutnya
                </Button>
            </Link>
        </HStack>
    );
}