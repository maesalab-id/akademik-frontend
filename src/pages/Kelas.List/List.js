import { NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, ListGroup, useClient, useList } from 'components'
import { useDebounce } from 'components/helper'
import React, { useEffect } from 'react'
import Item from './Item'

const List = () => {
  const client = useClient();
  const { items, setItems, filter, setPaging } = useList();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["classes"].find({
          query: {
            $limit: 25,
            "name": _f["name"] ? {
              $iLike: `%${_f["name"]}%`
            } : undefined,
            "generation": _f["generation"] || undefined,
            "study_program_id": _f["study_program_id"] || undefined,
            $sort: {
              name: 1
            },
            $include: [{
              model: "majors",
              $select: ["name"]
            }, {
              model: "study_programs",
              $select: ["name"]
            }, {
              model: "students",
              $select: ["id"]
            }]
          }
        });
        setItems(res.data);
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
  }, [client, setItems, setPaging, _f]);

  return (
    <>
      {items === null &&
        <Box sx={{ p: 2 }}>
          <Spinner size={50} />
        </Box>
      }
      {items && items.length === 0 &&
        <Box sx={{ p: 3 }}>
          <NonIdealState
            title="Kosong"
            description="Belum ada data"
          />
        </Box>
      }
      {items && items.map((item) => (
        <ListGroup.Item
          key={item["id"]}
          sx={{
            [`.action`]: {
              width: "30px",
              opacity: "0",
              pointerEvents: "none"
            },
            [`&:hover .action`]: {
              opacity: "1",
              pointerEvents: "unset"
            }
          }}>
          <Item data={item} />
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;
