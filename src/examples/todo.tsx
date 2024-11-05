import { createSignal } from "npm:solid-js";
import { For } from "solid-native-renderer";
import { createRenderEffect } from "npm:solid-js";
import { useColorScheme } from "../hooks/use-color-scheme.ts";

const storageApi = {
  set(key: string, value: string) {
    NSUserDefaults.standardUserDefaults.setObjectForKey(value, key);
  },
  get(key: string) {
    return NSUserDefaults.standardUserDefaults.objectForKey(key);
  },
  remove(key: string) {
    NSUserDefaults.standardUserDefaults.removeObjectForKey(key);
  },
};

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

const [todos, setTodos] = createSignal<TodoItem[]>(
  JSON.parse(storageApi.get("todos") || "[]")
);

export function TodoMVP() {
  const [loading, setLoading] = createSignal(true);
  // Get system color scheme mode
  const colorScheme = useColorScheme();
  let newTodo: string;
  let textField: HTMLTextFieldElement | null = null;

  function addTodo() {
    setTodos((prev) => {
      const next = [...prev];
      next.push({
        id: next.length + 1,
        title: newTodo,
        completed: false,
      });
      storageApi.set("todos", JSON.stringify(next));
      newTodo = "";
      textField?.clear();
      return next;
    });
  }

  createRenderEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return (
    <scroll-view
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <view
        style={{
          width: "100%",
          padding: 20,
          alignItems: "center",
          gap: 10,
          height: loading() || !todos().length ? "100%" : undefined,
        }}
      >
        <view
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colorScheme === "dark"
              ? "rgb(68, 68, 68)"
              : "rgb(200, 200, 200)",
            paddingHorizontal: 10,
          }}
        >
          <text-field
            ref={(el: HTMLTextFieldElement) => (textField = el)}
            onTextChange={(event) => (newTodo = event.value)}
            onSubmit={() => addTodo()}
            placeholder="Create a new todo item"
            style={{
              fontSize: 14,
              width: "100%",
              flex: 1,
            }}
          />

          <button
            title="Add"
            onClick={() => addTodo()}
            style={{
              backgroundColor: "#446b9e",
            }}
          />
        </view>

        <view
          style={{
            width: "100%",
            height: loading() || !todos().length ? "100%" : undefined,
            justifyContent: loading() || !todos().length ? "center" : undefined,
            alignItems: loading() || !todos().length ? "center" : undefined,
          }}
        >
          {loading() ? (
            <progress type="spinner" indeterminate size="small" />
          ) : (
            <For
              each={todos()}
              fallback={
                <text
                  style={{
                    color: "gray",
                  }}
                >
                  No todos found
                </text>
              }
            >
              {(item, index) => <TodoItem item={item} index={index} />}
            </For>
          )}
        </view>
      </view>
    </scroll-view>
  );
}

function TodoItem(props: { item: TodoItem; index: () => number }) {
  const colorScheme = useColorScheme();
  let textField: HTMLTextFieldElement | null = null;
  const [editable, setEditable] = createSignal(false);

  return (
    <view
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: props.index() % 2 === 0
          ? colorScheme === "dark" ? "rgba(0,0,0,0.1)" : "#f7f7f7"
          : undefined,
        paddingHorizontal: 10,
        width: "100%",
      }}
    >
      <view
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <checkbox
          checked={props.item.completed}
          onClick={(event) => {
            const checkbox = event.target as HTMLCheckboxElement;
            setTodos((prev) => {
              const next = [...prev];
              next[props.index()] = {
                ...next[props.index()],
                completed: !checkbox.checked,
              };
              return next;
            });
          }}
          style={{
            width: 15,
            height: 15,
          }}
        />
        <text-field
          ref={(el: HTMLTextFieldElement) => (textField = el)}
          style={{
            color: props.item.completed ? "gray" : undefined,
            fontSize: 14,
          }}
          value={props.item.title}
          editable={editable()}
          onSubmit={(event) => {
            setTodos((prev) => {
              const next = [...prev];
              next[props.index()] = {
                ...next[props.index()],
                title: event.value,
              };
              storageApi.set("todos", JSON.stringify(next));
              textField?.blur();
              setEditable(false);
              return next;
            });
          }}
        />
      </view>

      <view
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {editable() ? null : (
          <button
            icon="pencil"
            onClick={() => {
              setEditable(true);
              setTimeout(() => {
                textField?.focus();
              }, 300);
            }}
          />
        )}
        <button
          title="Remove"
          onClick={() => {
            setTodos((prev) => {
              const next = [...prev];
              next.splice(props.index(), 1);
              storageApi.set("todos", JSON.stringify(next));
              return next;
            });
          }}
        />
      </view>
    </view>
  );
}
