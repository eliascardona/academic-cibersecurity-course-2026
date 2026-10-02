import { Book } from "lucide-react";
import type { BookDto } from "~/lib/book/response-types";

interface BooksProps {
    books: BookDto[];
}

export function BookList({ books }: BooksProps) {
    if (books.length < 1) return <>no hay libros</>

    return (
        <>
            {books.map((book) => (
                <div className="px-4 py-2 border border-neutral-50 rounded-md">
                    <div className="flex justify-content-between">
                        <div>Registrar libro</div>
                        <Book className="size-6" />
                    </div>
                </div>
            ))}
        </>
    );
}
