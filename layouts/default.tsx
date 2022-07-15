import AppHeader from "../components/common/AppHeader/AppHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-auto">
      <main>
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

export default DefaultLayout;
