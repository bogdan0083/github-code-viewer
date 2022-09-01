import { PaletteMode } from "@lib/context/paletteModeContext";
import { NextPageContext } from "next";
import { Html, Head, Main, NextScript } from "next/document";
import cookies from "next-cookies";
import clsx from "clsx";

// Document.getInitialProps = function (ctx: NextPageContext) {

// 	const { paletteMode } = cookies(ctx);

// 	return { paletteMode: paletteMode || PaletteMode.System }
// }

export default function Document(ctx: NextPageContext) {
  const { paletteMode } = cookies(ctx);

  const className = clsx({
    "bg-white dark:bg-zinc-900 dark:text-gray-300":
      paletteMode === (PaletteMode.System || undefined),
  });

  return (
    <Html>
      <Head />
      <body className={className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
