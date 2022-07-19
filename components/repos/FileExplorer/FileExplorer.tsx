import { useRepoTree } from "../../../lib/graphql/repo";
import clsx from "clsx";
import {
  ExplorerTreeDirectory,
  ExplorerTreeFile,
} from "../../../lib/models/explorer";
import Link from "next/link";

interface FileExplorerProps {
  className?: string;
}

const File = ({ name, path }: Omit<ExplorerTreeFile, "type">) => {
  return (
    <Link href={path}>
      <a className={"text-xs block"}>{name}</a>
    </Link>
  );
};

const Directory = ({ name, path, oid, children }: ExplorerTreeDirectory) => {};

const FileExplorer = ({ className }: FileExplorerProps) => {
  const [result] = useRepoTree({
    owner: "vim",
    name: "vim",
  });

  const { tree, error, validationError, fetching } = result;

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (validationError) {
    return <p>Error: {validationError.message}</p>;
  }

  return (
    <div className={clsx("flex flex-col", className)}>
      hello from FileExplorer
    </div>
  );
};

export default FileExplorer;
