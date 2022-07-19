import AppHeader from "../common/AppHeader/AppHeader";

interface LayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

const SidenavLayout = ({ children, sideNavContent }: LayoutProps) => {
  return (
    <div className="flex">
      <div className="flex-col flex-shrink w-3/12">{sideNavContent}</div>
      <main className={"flex-grow"}>
        <AppHeader
          title={"GitHub Code Viewer"}
          caption={"Fast and quick"}
          fixed
        />
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default SidenavLayout;
