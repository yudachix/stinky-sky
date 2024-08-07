"use client";

import { BLIND_COLOR, CLOTHES_COLOR, WALL_COLOR } from "@/consts/color";
import CssBaseline from "@mui/material/CssBaseline";
import {
	Experimental_CssVarsProvider as CssVarsProvider,
	experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import type { PropsWithChildren, ReactNode } from "react";

export default function ThemeProvider({
	children,
}: PropsWithChildren): ReactNode {
	const theme = extendTheme({
		colorSchemes: {
			light: {
				palette: {
					primary: {
						main: WALL_COLOR,
					},
					text: {
						primary: CLOTHES_COLOR,
					},
					background: {
						paper: WALL_COLOR,
						default: BLIND_COLOR,
					},
				},
			},
		},
	});

	return (
		<CssVarsProvider defaultMode="light" theme={theme}>
			<CssBaseline />
			{children}
		</CssVarsProvider>
	);
}
