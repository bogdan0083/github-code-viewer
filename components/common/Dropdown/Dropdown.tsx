import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";

interface Elem {
  id: string;
}

interface DropdownProps<T extends Elem> {
  isLoading?: boolean;
  items?: T[];
  renderItem: (item: T) => ReactNode;
  className?: string;
  onClickOutside?: () => void;
  isOpen?: boolean;
}

const Dropdown = ({
  isLoading = false,
  items,
  renderItem,
  className,
  onClickOutside,
  isOpen = false,
}: DropdownProps<any>) => {
  const [selectedItem, setSelectedItem] = useState<Elem | null>(null);

  const handleClick = (item: Elem) => {
    setSelectedItem(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isOpen && onClickOutside) {
      setTimeout(() => {
        document.addEventListener("click", onClickOutside);
      }, 100);
    } else if (!isOpen && onClickOutside) {
      document.removeEventListener("click", onClickOutside);
    }

    return () => {
      if (onClickOutside) {
        document.removeEventListener("click", onClickOutside);
      }
    };
  }, [isOpen, onClickOutside]);

  return (
    <>
      {isOpen && (
        <div className="absolute bottom-0 translate-y-full right-0 w-full max-h-screen">
          <div
            className={clsx(
              "bg-white rounded shadow-md mt-2 border border-gray-200",
              className
            )}
          >
            {isLoading && (
              <div className="text-xs p-2">
                <div>Loading...</div>
              </div>
            )}
            {!isLoading && items && items.length === 0 && (
              <div className="text-sm">
                <div>No results found</div>
              </div>
            )}
            {!isLoading && items && (
              <div className="flex flex-col">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className={clsx(
                      "items-center py-2",
                      selectedItem &&
                        selectedItem.id === item.id &&
                        "bg-gray-100"
                    )}
                    onKeyDown={handleKeyDown}
                  >
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
