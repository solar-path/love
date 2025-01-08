import { Drawer } from "flowbite-react";
import { signal } from "@preact/signals";

export const DrawerProps = signal({
  title: "Default title",
  state: false,
  form: null,
});

export const fillDrawer = (form, title) => {
  DrawerProps.value = {
    title,
    state: true,
    form,
  };
};

export const closeDrawer = () => {
  DrawerProps.value = {
    title: "",
    state: false,
    form: null,
  };
};

export default function QDrawer() {
  return (
    <Drawer
      open={DrawerProps.value.state}
      onClose={closeDrawer}
      backdrop={false}
      position="right"
      className="w-1/4"
    >
      <Drawer.Header title={DrawerProps.value.title} />
      <Drawer.Items>
        {/* CONTENT */}
        {DrawerProps.value.form}
      </Drawer.Items>
    </Drawer>
  );
}
