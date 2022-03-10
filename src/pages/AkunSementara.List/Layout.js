import { Box, Flex, ListGroup, useList, Pagination } from 'components'
import List from './List'
import { Button, ButtonGroup, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import { useState } from 'react'
import DialogHapus from './Dialog.Hapus'
import { useHistory } from 'react-router-dom'
import { REGISTRATION_STATUS } from 'components/constants'

export const Layout = () => {

  const {
    selectedItem,
    paging,
    setPaging,
    items,
    status,
    dispatchSelectedItem,
    filter,
    setFilter
  } = useList();

  const [dialogOpen, setDialogOpen] = useState(null);

  const history = useHistory();

  return (
    <Box>
      <Box sx={{ px: 3, pt: 3 }}>
        <Filter />
        <ListGroup sx={{
          width: "100%",
          [`.${Classes.CHECKBOX}`]: {
            m: 0
          }
        }}>
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ width: 40, flexShrink: 0, }}>
                <Checkbox
                  disabled={paging.total === 0}
                  checked={status.checked}
                  indeterminate={status.indeterminate}
                  onChange={(e) => {
                    dispatchSelectedItem({
                      type: "all",
                      data: e.target.checked
                    })
                  }}
                />
              </Box>
              <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
                {selectedItem.length > 0
                  && <Box>{selectedItem.length} selected</Box>
                }
                {/* {items !== null
                  && (selectedItem.length === items.length)
                  && (selectedItem.length < paging.total)
                  && <Button
                    minimal={true}
                    intent="primary"
                    text={`Select all ${paging.total} item`}
                    onClick={() => { }}
                  />
                } */}
                {selectedItem.length > 0 &&
                  <Button
                    minimal={true}
                    intent="danger"
                    text={`Delete ${selectedItem.length} selected`}
                    onClick={() => setDialogOpen("delete")}
                  />
                }
                <DialogHapus
                  data={selectedItem}
                  isOpen={dialogOpen === "delete"}
                  onClose={() => { setDialogOpen(null) }}
                  onSubmitted={() => {
                    history.go(0);
                  }}
                />
              </Flex>
              <Box>
                <ButtonGroup>
                  {[{
                    intent: "success",
                    icon: "confirm",
                    text: "Passed",
                    value: REGISTRATION_STATUS.PASSED
                  }, {
                    intent: "primary",
                    icon: "edit",
                    text: "Registered",
                    value: REGISTRATION_STATUS.REGISTERED
                  }, {
                    intent: "danger",
                    icon: "small-cross",
                    text: "Failed",
                    value: REGISTRATION_STATUS.FAILED
                  }].map(({ value, intent, text, ...props }) => {
                    const isActive = value === filter.status;
                    return (
                      <Button
                        {...props}
                        outlined={true}
                        key={text}
                        intent={isActive ? intent : "none"}
                        active={isActive}
                        text={isActive && text}
                        onClick={() => {
                          if (isActive) return
                          setFilter(f => ({ ...f, status: value }))
                        }}
                      />
                    )
                  })}
                </ButtonGroup>
              </Box>
              <Box sx={{ ml: 2 }}>
                {[
                  !!filter["study_program_id"],
                  !!filter["status"],
                ].indexOf(true) !== -1
                  && <Button
                    minimal={true}
                    intent="warning"
                    icon="filter-remove"
                    onClick={() => {
                      history.replace({
                        search: ""
                      });
                      setFilter(filter => ({
                        ...filter,
                        "study_program_id": null,
                        "status": null
                      }))
                    }}
                  />}
              </Box>
            </Flex>
          </ListGroup.Header>
          <List />
        </ListGroup>
        <Pagination
          loading={items === null}
          total={paging.total}
          limit={paging.limit}
          skip={paging.skip}
          onClick={({ page, skip }) => {
            setPaging(paging => ({ ...paging, skip: skip }));
          }}
        />
      </Box>
    </Box>
  )
}
