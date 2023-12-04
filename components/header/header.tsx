import Image from "next/image";
import Link from "next/link";
import { Button } from "components/ui/button";
import { NavElements } from "components/ui/nav/nav-elements";
import { NavLink } from "interface/ui/NavLink";

export default async function Header() {
  const navigation = [
    { key: "Home", value: "" },
    { key: "About", value: "features" },
    { key: "Pricing", value: "pricing" },
  ] as NavLink[];


  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
              <>
                <div className="flex items-center space-x-6 ">
                  <Image src="/logo.png" alt="logo" width={48} height={48} />
                </div>
                <div className="mx-6 ">
                  <NavElements navigationLinks={navigation} />
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <Link href="/register" className="">
                  <Button variant="default" >
                      Register
                    </Button>
                  </Link>
                </div>
                </>
          </div>
        </div>
      </div>
    </>
  );
}
