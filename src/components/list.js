import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react"

const ListContext = createContext();

const ListProvider = ({
  children,
  onSelectionChange = () => { },
  onFilterChange = () => { },
  ...props
}) => {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState(props.filter || null);
  const [paging, setPaging] = useState({
    total: null,
    limit: null,
    skip: 0
  });

  useEffect(() => {
    onFilterChange(filter);
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedItemReducer = useCallback((state, action) => {
    switch (action.type) {
      case "toggle":
        if (action.data.value) {
          return selectedItemReducer(state, {
            type: "add",
            data: action.data
          });
        } else {
          return selectedItemReducer(state, {
            type: "remove",
            data: action.data
          });
        }
      case "add":
        return [...state, action.data.name];
      case "remove":
        return [...state.filter(item => item !== action.data.name)];
      case "all":
        if (action.data) {
          return [...items.map(item => item.id)];
        } else {
          return [];
        }
      case "exclude":
        if (action.data) {
          return [...items.filter(item => action.data.indexOf(item.id) !== -1).map(item => item.id)];
        } else {
          return [];
        }
      default: return state;
    }
  }, [items])

  const [selectedItem, dispatchSelectedItem] = useReducer(selectedItemReducer, []);

  useEffect(() => {
    onSelectionChange(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const status = useMemo(() => {
    let indeterminate = false;
    let checked = false;
    if (items) {
      indeterminate = (selectedItem.length > 0)
        && (selectedItem.length < items.length);
      checked = selectedItem.length > 0 && selectedItem.length === items.length;
    }
    return {
      indeterminate,
      checked,
    }
  }, [items, selectedItem]);

  return (
    <ListContext.Provider value={{
      items,
      setItems,

      selectedItem,
      dispatchSelectedItem,

      paging,
      setPaging,

      filter,
      setFilter,

      status
    }}>
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => {
  const list = useContext(ListContext);
  return list;
}

export default ListProvider;