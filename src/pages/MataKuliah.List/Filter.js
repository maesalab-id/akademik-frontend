import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select, useList } from "components";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DialogHapusMataKuliah from "./Dialog.Hapus";
import DialogMataKuliahBaru from "./Dialog.Tambah";

const Filter = () => {
  const location = useLocation();
  const { selectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(new URLSearchParams(location.search).get("d") || null);
  const history = useHistory();

  return (
    <Flex>
      <Box>
        <ControlGroup>
          <Select
            label="Filter"
            options={[
              { label: "ID", value: 0 },
              { label: "Nama", value: 1 },
              { label: "NIDN", value: 2 },
            ]}
          />
          <InputGroup leftIcon="search" placeholder="Filter by name" />
        </ControlGroup>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Flex>
        {selectedItem.length > 0 &&
          <Button
            minimal={true}
            intent="danger"
            text={`Delete ${selectedItem.length} selected`}
            onClick={() => setDialogOpen("delete")}
          />
        }
        <Divider vertical={true} sx={{ my: 1 }} />
        <Button
          intent="primary"
          text="Mata Kuliah Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Flex>
      <DialogMataKuliahBaru
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
      <DialogHapusMataKuliah
        data={selectedItem}
        isOpen={dialogOpen === "delete"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
    </Flex>
  )
}

export default Filter;