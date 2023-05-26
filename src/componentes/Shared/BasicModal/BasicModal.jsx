import { Modal } from "semantic-ui-react";
import "./BasicModal.scss";

export const BasicModal = ({ show, close, title, size, children }) => {
  return (
    <Modal closeIcon open={show} onClose={close} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}

      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

BasicModal.defaultProps = {
  size: "tiny",
};
