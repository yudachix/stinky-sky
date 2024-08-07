import ThemeProvider from "@/components/theme-provider";
import { CLOTHES_COLOR, FACE_COLOR, WALL_COLOR } from "@/consts/color";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { PropsWithChildren, ReactNode } from "react";

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <html lang="ja">
      <head />
      <Box
        component="body"
        height="100svh"
        sx={{
          backgroundImage: `linear-gradient(to bottom, ${WALL_COLOR}, ${FACE_COLOR}, ${CLOTHES_COLOR} 80%)`,
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </Box>
    </html>
  );
}
