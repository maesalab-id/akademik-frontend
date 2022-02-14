import { Checkbox, Classes, NonIdealState } from "@blueprintjs/core";
import { Box, Container, Flex, ListGroup, useClient, useList } from "components";
import { Pagination } from "components/Pagination";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const client = useClient();
  const { filter, items, setItems, status, paging, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const query = {
          $limit: 50,
        };
        if (filter["role"] === "Dosen") {
          query["lecturer_id"] = { $ne: null }
        } else if (filter["role"] === "Mahasiswa") {
          query["student_id"] = { $ne: null };
        } else if (filter["role"] === "Public") {
          query["registration_id"] = { $ne: null };
        } else if (filter["role"] !== "") {
          query["lecturer_id"] = null;
          query["student_id"] = null;
          query["registration_id"] = null;
        }
        const res = await client["users"].find({ query });
        setItems(res.data.map((item) => {
          let role = "Admin";
          let url = "";
          if (item["lecturer_id"] !== null) {
            role = "Dosen";
            url = `/pengajar/${item["lecturer_id"]}`;
          }
          if (item["student_id"] !== null) {
            role = "Mahasiswa";
            url = `/mahasiswa/${item["student_id"]}`;
          }
          if (item["registration_id"] !== null) {
            role = "Public";
            url = `/penerimaan/${item["registration_id"]}`;
          }

          return {
            id: item["id"],
            username: item["username"],
            role: role,
            link: {
              label: "Detail",
              url
            }
          }
        }));
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    }
    fetch();
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container sx={{ px: 3 }}>
      <ListGroup
        sx={{
          [`.${Classes.CHECKBOX}`]: {
            m: 0
          }
        }}
      >
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box>
              <Checkbox
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
            <Box>
            </Box>
          </Flex>
        </ListGroup.Header>
        {items && items.length === 0 && (
          <Box sx={{ my: 3 }}>
            <NonIdealState
              title="No user available"
            />
          </Box>
        )}
        {items && items.map((item) => (
          <ListGroup.Item key={item["id"]}>
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox
                  checked={selectedItem.indexOf(item["id"]) !== -1}
                  onChange={(e) => {
                    dispatchSelectedItem({
                      type: "toggle",
                      data: {
                        name: item["id"],
                        value: e.target.checked
                      }
                    })
                  }}
                />
              </Box>
              <Box sx={{ flexGrow: 1, flexShrink: 0, width: `${100 / 3}%` }}>
                <Box>
                  {item["username"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Username
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, flexShrink: 0, width: `${100 / 3}%` }}>
                <Box>
                  {item["role"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Role
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, flexShrink: 0, width: `${100 / 3}%` }}>
                {item["link"]["url"] &&
                  <Box>
                    <Link to={item["link"]["url"]}>
                      {item["link"]["label"]}
                    </Link>
                  </Box>
                }
              </Box>
            </Flex>
          </ListGroup.Item>))}
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
    </Container >
  )
}

export default List;