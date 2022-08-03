import AppHeader from "../common/AppHeader/AppHeader";
import styles from "./sidenavLayout.module.css";
import clsx from "clsx";

interface LayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

const SidenavLayout = ({ children, sideNavContent }: LayoutProps) => {
  return (
    <>
      <AppHeader title={"GitHub Code Viewer"} mobileTitle={"GCV"} fixed />
      <main className={styles.layoutContainer}>
        <div
          className={clsx(
            "flex-col flex-shrink-0 md:w-3/12 md:border-r border-gray-300 md:h-full overflow-auto hidden md:flex"
          )}
        >
          {sideNavContent}
        </div>
        <div className="flex-grow md:max-h-full overflow-auto">{children}</div>
      </main>
    </>
  );
};

export default SidenavLayout;
