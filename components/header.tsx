import Link from "next/link";
import Image from "next/image";
import Dropdown from "./headerDropDown";
import { useState } from "react";

export default function Header() {
  const [aboutDropDown, setAboutDropDown] = useState(false);
  const [articlesDropDown, setArticlesDropDown] = useState(false);
  const [contributeDropDown, setContributeDropDown] = useState(false);
  const [issuesDropDown, setIssuesDropDown] = useState(false);
  //at smaller than lg breakpoint become a burger menu

  return (
    <div className="text-2xl md:text-4xl mb-20 pt-8 flex flex-row justify-between items-center font-['Times_New_Roman'] font-bold bg-ebor-purple">
      <Link href="/" className="flex flex-row items-center">
        <Image src="/eborlex-logo.png" alt="Logo" width={100} height={100} />
        <h1 className="ml-2">Ebor lex Journal</h1>
      </Link>
      <div className="flex flex-col space-x-10 lg:flex-row">
        <div
          id="about"
          className="relative cursor-pointer"
          onMouseOver={() => setAboutDropDown(true)}
          onMouseOut={() => setAboutDropDown(false)}
        >
          <p className="mr-4">About</p>
          {aboutDropDown && <Dropdown items={[]} />}
        </div>
        <div
          id="articles"
          className="relative cursor-pointer"
          onMouseOver={() => setArticlesDropDown(true)}
          onMouseOut={() => setArticlesDropDown(false)}
        >
          <p className="mr-4">Articles</p>
          {articlesDropDown && <Dropdown items={[]} />}
        </div>
        <div
          id="contribute"
          className="relative cursor-pointer"
          onMouseOver={() => setContributeDropDown(true)}
          onMouseOut={() => setContributeDropDown(false)}
        >
          <p className="mr-4">Contribute</p>
          {contributeDropDown && <Dropdown items={[]} />}
        </div>
        <div
          id="issues"
          className="relative cursor-pointer"
          onMouseOver={() => setIssuesDropDown(true)}
          onMouseOut={() => setIssuesDropDown(false)}
        >
          <p className="mr-4">Issues</p>
          {issuesDropDown && <Dropdown items={[]} />}
        </div>
      </div>
    </div>
  );
}
