"use client";

import {
  BLIND_COLOR,
  CLOTHES_COLOR,
  FACE_COLOR,
  WALL_COLOR,
} from "@/consts/color";
import { TITLE } from "@/consts/site";
import { loadImage } from "@/utils/image";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import ImageWorker from "worker-loader?filename=static/[fullhash].worker.js!../workers/image.worker";

const DEFAULT_COLOR_SIZE = 256;

enum Action {
  Menu = 0,
  Edit = 1,
}

export default function App(): ReactNode {
  const [colorSize, setColorSize] = useState(DEFAULT_COLOR_SIZE);
  const [processingFile, setProcessingFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [color, setColor] = useState<{ color: string; id: number }>();
  const [helpOpen, setHelpOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [action, setAction] = useState(Action.Menu);
  const [defaultPalatte] = useState(() =>
    [WALL_COLOR, FACE_COLOR, CLOTHES_COLOR, BLIND_COLOR].map((color) => ({
      color,
      id: Math.random(),
    })),
  );
  const [defaultPalatteIds] = useState(
    () => new Set(defaultPalatte.map((color) => color.id)),
  );
  const [palette, setPalette] = useState(defaultPalatte);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
      },
      { signal: controller.signal },
    );

    window.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        if (processingFile) {
          return;
        }

        const file = event.dataTransfer?.files[0];

        if (!file) {
          return;
        }

        setProcessingFile(file);
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [processingFile]);

  useEffect(() => {
    if (!processingFile) {
      return;
    }

    setProgress(0);

    const worker = new ImageWorker();

    (async () => {
      try {
        const src = URL.createObjectURL(processingFile);
        const image = await loadImage(src).finally(() => {
          URL.revokeObjectURL(src);
        });
        const canvas = document.createElement("canvas");
        const offscreenCanvas = canvas.transferControlToOffscreen();
        const imageBitmap = await createImageBitmap(image);
        const resultImageBitmap = await new Promise<ImageBitmap>(
          (resolve, reject) => {
            worker.addEventListener("message", ({ data }) => {
              switch (data.type) {
                case "progress": {
                  setProgress(data.progress);

                  break;
                }

                case "done": {
                  resolve(data.resultImageBitmap);

                  break;
                }
              }
            });

            worker.postMessage(
              {
                offscreenCanvas,
                imageBitmap,
                colorSize,
                palette: palette.map((color) => color.color),
              },
              [offscreenCanvas, imageBitmap],
            );
          },
        );

        const resultCanvas = document.createElement("canvas");

        resultCanvas.classList.add("result");
        resultCanvas.width = resultImageBitmap.width;
        resultCanvas.height = resultImageBitmap.height;

        const resultContext = resultCanvas.getContext("2d");

        if (!resultContext) {
          throw new Error("Can't get context");
        }

        resultContext.drawImage(resultImageBitmap, 0, 0);

        if (!resultRef.current) {
          throw new Error("Can't draw image");
        }

        resultRef.current.replaceChildren();
        resultRef.current.append(resultCanvas);
      } finally {
        setProcessingFile(undefined);
      }
    })();

    return () => {
      worker.terminate();
    };
  }, [processingFile, colorSize, palette]);

  return (
    <>
      {!!color && !!anchorEl && (
        <>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={action === Action.Edit}
            onClose={() => {
              setColor(undefined);
              setAnchorEl(undefined);
            }}
          >
            <SketchPicker
              styles={{
                default: {
                  picker: {
                    backgroundColor: WALL_COLOR,
                  },
                },
              }}
              disableAlpha
              color={color.color}
              onChange={(result) =>
                setPalette((prev) =>
                  prev.map((c) => {
                    const newColor = { ...c, color: result.hex };

                    setColor(newColor);

                    return c.id === color.id ? newColor : c;
                  }),
                )
              }
            />
          </Popover>
          <Menu
            open={action === Action.Menu}
            anchorEl={anchorEl}
            onClose={() => {
              setColor(undefined);
              setAnchorEl(undefined);
            }}
          >
            <MenuItem onClick={() => setAction(Action.Edit)}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              編集
            </MenuItem>
            <MenuItem
              onClick={() => {
                setPalette((prev) => prev.filter((c) => c.id !== color.id));
                setAnchorEl(undefined);
                setColor(undefined);
              }}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              削除
            </MenuItem>
          </Menu>
        </>
      )}
      <Dialog open={settingsOpen} fullScreen>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>設定</Typography>
            <IconButton onClick={() => setSettingsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack alignItems="flex-start" spacing={2}>
            <Typography variant="h6">減色処理</Typography>
            <Typography>色数を減らすと処理が高速になります</Typography>
            <TextField
              label="色数"
              type="number"
              inputProps={{
                min: 1,
              }}
              value={colorSize}
              onChange={(event) => {
                const colorSize = Number(event.currentTarget.value);

                if (
                  colorSize < 1 ||
                  !Number.isFinite(colorSize) ||
                  Number.isNaN(colorSize)
                ) {
                  return;
                }

                setColorSize(colorSize);
              }}
            />
            <Typography variant="h6">カラーパレット</Typography>
            <Stack
              useFlexGap
              spacing={1}
              direction="row"
              alignItems="center"
              flexWrap="wrap"
            >
              {palette.map((color) => {
                const { color: color_, id } = color;
                const isDefaultColor = defaultPalatteIds.has(id);
                const sx: SxProps = {
                  backgroundColor: color_,
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  border: "1px solid var(--mui-palette-text-primary)",
                };

                return isDefaultColor ? (
                  <Box sx={sx} key={id} />
                ) : (
                  <ButtonBase
                    onClick={(event) => {
                      setColor(color);
                      setAction(Action.Menu);
                      setAnchorEl(event.currentTarget);
                    }}
                    sx={sx}
                    key={id}
                  />
                );
              })}
              <IconButton
                onClick={() =>
                  setPalette((prev) => [
                    ...prev,
                    { id: Math.random(), color: "#fff" },
                  ])
                }
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <Container sx={{ height: "100%" }}>
        <Stack spacing={2} alignItems="flex-start" padding={2} height="100%">
          <Stack
            useFlexGap
            direction="row"
            alignItems="center"
            width="100%"
            spacing={2}
            justifyContent="space-between"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
              },
            })}
          >
            <Typography component="h1" variant="h4">
              {TITLE}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                disabled
                startIcon={<HelpIcon />}
                sx={{ color: "text.primary" }}
              >
                ヘルプ
              </Button>
              <Button
                disabled={!!processingFile}
                onClick={() => setSettingsOpen(true)}
                startIcon={<SettingsIcon />}
                variant="contained"
              >
                設定
              </Button>
            </Stack>
          </Stack>
          <Box height="10rem" width="100%">
            {!processingFile && (
              <Paper
                component="label"
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  padding: "1rem",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>
                  ここを押すかファイルをドロップして画像を読み込みます
                </Typography>
                <Box
                  disabled={!!processingFile}
                  component="input"
                  type="file"
                  accept="image/*"
                  sx={{
                    clip: "rect(0 0 0 0)",
                    clipPath: "inset(50%)",
                    height: 1,
                    overflow: "hidden",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    whiteSpace: "nowrap",
                    width: 1,
                  }}
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      return;
                    }

                    setProcessingFile(file);
                  }}
                />
              </Paper>
            )}
            {!!processingFile && (
              <Stack
                height="100%"
                padding={1}
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <LinearProgress
                  sx={{ width: "100%" }}
                  variant="determinate"
                  value={progress}
                />
                <Typography fontWeight="bold">処理中です</Typography>
              </Stack>
            )}
          </Box>
          <Stack
            alignItems="flex-start"
            spacing={2}
            display={progress < 100 ? "none" : undefined}
            flex={1}
            height="100%"
            width="100%"
          >
            <Stack
              flex={1}
              height="100%"
              width="100%"
              ref={resultRef}
              position="relative"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 15px 15px",
                backgroundImage:
                  "linear-gradient(45deg, #aaa 25%, transparent 25%, transparent 75%, #aaa 75%), linear-gradient(45deg, #aaa 25%, transparent 25%, transparent 75%, #aaa 75%)",
                backgroundColor: "#ddd",
                ".result": {
                  position: "absolute",
                  width: "auto",
                  height: "auto",
                  maxWidth: "95%",
                  maxHeight: "95%",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                const resultCanvas = document.getElementsByClassName(
                  "result",
                )[0] as HTMLCanvasElement;

                if (!resultCanvas) {
                  return;
                }

                resultCanvas.toBlob((blob) => {
                  if (!blob) {
                    return;
                  }

                  const a = document.createElement("a");

                  a.href = URL.createObjectURL(blob);
                  a.download = `${Math.random().toString(36).slice(2)}.png`;
                  a.click();
                  URL.revokeObjectURL(a.href);
                }, "image/png");
              }}
            >
              画像を保存
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
