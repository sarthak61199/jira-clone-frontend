import CreateIssueButton from "./create-issue-button";
import NavbarActionButtons from "./navbar-action-buttons";

export default function Navbar() {
  return (
    <nav className="flex justify-between h-20 items-center">
      <h1 className="text-5xl">JIRA</h1>
      <CreateIssueButton />
      <NavbarActionButtons />
    </nav>
  );
}
