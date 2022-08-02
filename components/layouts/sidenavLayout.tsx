import AppHeader from "../common/AppHeader/AppHeader";
import styles from "./sidenavLayout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

const SidenavLayout = ({ children, sideNavContent }: LayoutProps) => {
  return (
    <>
      <AppHeader title={"GitHub Code Viewer"} mobileTitle={"GCV"} fixed />
      <main className={styles.layoutContainer}>
        <div className="flex-col flex-shrink-0 w-3/12 border-r border-gray-300 h-full overflow-auto">
          {sideNavContent}
        </div>
        <div className="flex-grow max-h-full overflow-auto">{children}</div>
      </main>
    </>
  );
};

export default SidenavLayout;
