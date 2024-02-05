import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";

function AddTodo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Button className="absolute " onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer
        className=""
        anchor={"bottom"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalClose />
        <DialogTitle>
          <div className="w-full h-full justify-center items-center flex flex-col">
            <FormControl>
              <FormLabel
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Add to do
              </FormLabel>
              <Input className="py-4" placeholder="Gonna do?" />
            </FormControl>
            <div>
              <Box className="mt-3">
                <Button
                  color="neutral"
                  sx={{
                    py: 2,
                    px: 13,
                    display: "grid",
                    gap: 2,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  Add
                </Button>
              </Box>
            </div>
          </div>
        </DialogTitle>
      </Drawer>
    </Box>
  );
}

export default AddTodo;
