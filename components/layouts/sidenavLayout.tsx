import AppHeader from "../common/AppHeader/AppHeader";

interface LayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

const SidenavLayout = ({ children, sideNavContent }: LayoutProps) => {
  return (
    <>
      <AppHeader title={"GitHub Code Viewer"} fixed />
      <main className={"flex flex-grow"}>
        <div className="flex-col flex-shrink w-3/12 border-r border-gray-300 max-h-full">
          {sideNavContent}
        </div>
        <div className="flex-grow">{children}</div>
      </main>
    </>
  );
};

export default SidenavLayout;
