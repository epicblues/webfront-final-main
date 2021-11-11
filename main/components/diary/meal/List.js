import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";

const List = ({ product, index }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      key={index}
      style={{
        display: "grid",
        gridTemplateColumns: "9.5fr 0.5fr",
      }}
    >
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        <div className="header">
          {product.name}
          <div className="description">
            {product.mfr} / {product.serve}
            {product.unit}
          </div>
        </div>
        <div className="right floated" style={{ margin: "8px 10px 0 0" }}>
          {product.kcal}Kcal
        </div>
      </div>
      <div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<i className="eye icon" style={{ marginTop: 8 }}></i>}
        >
          <Modal.Header>선택한 음식</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>영양정보</Header>
              {/* {selectedData.map((value, index) => {
                            return (
                                <>
                                <div key={index}>
                                    <span>
                                        {value.name}
                                    </span>
                                    /
                                    <span>
                                        {value.mfr}
                                    </span>
                                    <br />
                                    <input
                                        ref={inputRef}
                                        type='text'
                                        placeholder='선택한 음식의 양'
                                    />
                                    <span>
                                        단위:({value.unit})
                                    </span>
                                </div>
                                </>
                            );
                        })} */}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              content="확인"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);
                addToCart(value);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};

export default List;
