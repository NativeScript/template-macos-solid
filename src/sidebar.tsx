import { For } from "npm:solid-js";
import Text from "./components/text.tsx";
import Examples from "./examples/index.tsx";
import { Counter } from "./examples/counter.tsx";
import { TodoMVP } from "./examples/todo.tsx";

interface SidebarBaseItem {
  id: string;
  icon?: string;
  title?: string;
  url?: string;
  component(): JSX.Element;
}
export interface SidebarItem extends SidebarBaseItem {
  children?: Array<SidebarBaseItem>;
}
export const sidebarItemsData: Array<Array<SidebarItem>> = [
  [
    {
      id: NSUUID.UUID().UUIDString,
      icon: "house",
      title: "Hello macOS",
      component: Text,
    },
    {
      id: NSUUID.UUID().UUIDString,
      icon: "list.star",
      title: "Examples",
      component: Examples,
      children: [
        {
          id: NSUUID.UUID().UUIDString,
          icon: "00.circle",
          title: "Counter",
          component: Counter,
        },
        {
          id: NSUUID.UUID().UUIDString,
          icon: "checklist",
          title: "Simple Todos",
          component: TodoMVP,
        },
      ],
    },
  ],
];

type SidebarProps = {
  selectedView: number;
  onSelectedItemChange: (item: SidebarItem) => void;
  selectedItem?: SidebarItem;
};

function _findItem(item: SidebarItem, title: string): SidebarItem | undefined {
  return item.title === title
    ? item
    : item.children?.find((child) => _findItem(child, title));
}

export default function Sidebar(props: SidebarProps) {
  return (
    <side-bar
      style={{
        maxWidth: 250,
        minWidth: 200,
      }}
    >
      <scroll-view
        disableDefaultDocumentView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <outline
          onItemSelected={(event) => {
            props.onSelectedItemChange(
              event.item.getAttribute("data-item") as unknown as SidebarItem
            );
          }}
        >
          <For each={sidebarItemsData[props.selectedView]}>
            {(item, _index) => (
              <table-cell
                selected={props.selectedItem?.id === item.id}
                data-item={item}
                identifier={item.id}
              >
                <image symbol={item.icon} />
                <text>{item.title}</text>
                <For each={item.children}>
                  {(child, _index) => (
                    <table-cell
                      selected={props.selectedItem?.id === child.id}
                      identifier={item.id}
                      data-item={child}
                    >
                      <image symbol={child.icon} />
                      <text>{child.title}</text>
                    </table-cell>
                  )}
                </For>
              </table-cell>
            )}
          </For>
        </outline>
      </scroll-view>
    </side-bar>
  );
}
