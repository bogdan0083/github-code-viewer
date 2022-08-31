import clsx from "clsx";
import { HTMLAttributes, InputHTMLAttributes, useMemo } from "react";
import { Transition } from "@headlessui/react";
import { useAutocomplete, UseAutocompleteProps } from "@mui/base";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

interface DropdownProps<T>
  extends UseAutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  > {
  isLoading?: boolean;
  className?: string;
  open?: boolean;
  renderInput: (params: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
  renderOption: (
    props: HTMLAttributes<HTMLLIElement>,
    option: T
  ) => JSX.Element;
}

function Autocomplete<T>({
  isLoading,
  className,
  renderInput,
  renderOption,
  ...otherProps
}: DropdownProps<T>) {
  const [paletteMode] = usePaletteMode();
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    popupOpen,
  } = useAutocomplete(otherProps);

  const inputElem = useMemo(
    () => renderInput(getInputProps()),
    [renderInput, getInputProps]
  );

  return (
    <div {...getRootProps()} className={clsx("relative", className)}>
      {inputElem}
      <Transition
        show={popupOpen}
        enter={"transition-all"}
        enterFrom={"opacity-0 scale-[0.99]"}
        enterTo={"opacity-100 scale-[1]"}
        leave={"transition-all"}
        leaveFrom={"opacity-100 scale-[1]"}
        leaveTo={"opacity-0 scale-[0.99]"}
        className={clsx("absolute -bottom-2 translate-y-full mt-2 w-full")}
      >
        {groupedOptions.length === 0 && isLoading && (
          <div
            className={clsx({
              "text-xs p-2 rounded shadow-md border w-full": true,
              "bg-white dark:border-gray-800 dark:bg-zinc-900": paletteMode === PaletteMode.System,
            })}
          >
            <div>Loading...</div>
          </div>
        )}
        {groupedOptions.length > 0 && (
          <ul
            {...getListboxProps()}
            className={clsx({
              "text-xs p-2 rounded shadow-md border w-full": true,
              "bg-white border-gray-200 dark:bg-zinc-900 dark:border-gray-700": paletteMode === PaletteMode.System,
            })}
          >
            {groupedOptions.length > 0 &&
              // @TODO: Fix this type
              // @ts-ignore
              groupedOptions.map((option: T, index) =>
                renderOption(getOptionProps({ option, index }), option)
              )}
          </ul>
        )}
      </Transition>
    </div>
  );
}

export default Autocomplete;
