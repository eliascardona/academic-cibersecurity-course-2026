import { Book } from "lucide-react";
import { Link } from "react-router";

export function GoToBookCreationButton() {
    return (
        <div className="px-4 py-6">
            <div className="p-2 border border-neutral-600 rounded-md">
                <Link to={"/create-book"}>
                    <div className="flex justify-content-between">
                        <div>Clic para registrar libro</div>
                        <Book className="size-6" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
