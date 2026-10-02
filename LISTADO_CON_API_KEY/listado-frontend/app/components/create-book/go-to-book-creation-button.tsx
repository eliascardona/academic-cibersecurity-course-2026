import { Book } from "lucide-react";
import { Link } from "react-router";

export function GoToBookCreationButton() {
    return (
        <Link to={"/create-book"}>
            <div className="px-4 py-2 border border-neutral-50 rounded-md">
                <div className="flex justify-content-between">
                    <div>Registrar libro</div>
                    <Book className="size-6" />
                </div>
            </div>
        </Link>
    );
}
