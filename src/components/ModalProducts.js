import CloseIcon from "@material-ui/icons/Close";

import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from "@material-ui/core";
import { useModal } from "../hooks/useModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  divButton: {
    display: "flex",
    justifyContent: "right",
  },
}));

export function ModalProducts() {
  const classes = useStyles();
  const { modal, open, setOpen } = useModal();

  function handleCloseModal() {
    setOpen(false);
  }

  return (
    <div>
      {modal.map((modalItem) => (
        <Modal
          key={modalItem.id}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={classes.divButton}>
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  color="secondary"
                  startIcon={<CloseIcon />}
                >
                  Fechar
                </Button>
              </div>
              <h1 id="transition-modal-title">
                {modalItem.title}
              </h1>
              <Typography variant="subtitle1" id="transition-modal-description">
                {modalItem.description}
              </Typography>
            </div>
          </Fade>
        </Modal>
      ))}
    </div>
  );
}
