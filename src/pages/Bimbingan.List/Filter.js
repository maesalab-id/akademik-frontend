import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Filter = () => {
  const location = useLocation();
  const { selectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(new URLSearchParams(location.search).get("d") || null);
  const history = useHistory();
  return (
    <Flex
      sx={{
        mb: 3,
        mr: -3,
        "> div": {
          mr: 3
        }
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ControlGroup>
          <Button text="Filter" />
          <InputGroup fill={true} />
        </ControlGroup>
      </Box>
      <Box>
        {selectedItem.length > 0 &&
          <Button
            minimal={true}
            intent="danger"
            text={`Delete ${selectedItem.length} selected`}
            onClick={() => setDialogOpen("delete")}
          />
        }
      </Box>
      <Box>
        <ButtonGroup>
          <Button text="Alumni" />
          <Button text="Drop out" />
        </ButtonGroup>
      </Box>
      <Box>
        <Button
          intent="primary"
          text="Mahasiswa Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Box>
    </Flex>
  )
}

export default Filter;