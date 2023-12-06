import Link from "next/link";
import { NavLink } from "customTypes/ui/NavLink";


export function NavElements({ navigationLinks }: { navigationLinks: NavLink[] }) {
  return (
    <nav
      className="flex items-center space-x-4 lg:space-x-6">
        {navigationLinks.map((link: { key: string, value: string}) => (
            <Link
            key={link.key}
            href={`/${link.value}`}
            className="text-sm font-medium transition-colors hover:text-primary"
            >
            {link.key}
            </Link>
        ))}
    </nav>
  );
}
