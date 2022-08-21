import ThemedButton from "../../common/ThemedButton/ThemedButton";
import clsx from "clsx";
import { useRouter } from "next/router";

interface RepoBreadcrumbsProps {
  path: string[];
  className?: string;
  basePath: string;
}

const RepoBreadcrumbs = ({
  path,
  className,
  basePath,
}: RepoBreadcrumbsProps) => {
  const router = useRouter();

  const handleBreadcrumbClick = (index: number) => {
    router.push(
      `/${basePath}${path
        .slice(0, index + 1)
        .join("/")
        .slice(1)}`
    );
  };

  return (
    <div
      className={clsx("flex items-center flex-wrap", className)}
      data-testid={"RepoBreadcrumbs"}
    >
      {path.map((entry, index) =>
        index === path.length - 1 ? (
          <span key={index} className={"m-1"}>
            {entry}
          </span>
        ) : (
          <ThemedButton
            key={index}
            size={"xs"}
            className={"m-1"}
            variant={"outlined"}
            onClick={() => handleBreadcrumbClick(index)}
          >
            {entry}
          </ThemedButton>
        )
      )}
    </div>
  );
};

export default RepoBreadcrumbs;
