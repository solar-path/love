import { Drawer } from "flowbite-react";
import Icon from "../assets/favicon.png";
import { signal } from "@preact/signals";

export const DrawerProps = signal({
  title: "Default title",
  state: true,
  form: null,
});

export const fillDrawer = (form, title) => {
  DrawerProps.value = {
    title,
    state: false,
    form,
  };
};

export const closeDrawer = () => {
  DrawerProps.value = {
    title: "",
    state: true,
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
      {/* TITLE */}
      <Drawer.Header
        title={DrawerProps.value.title}
        titleIcon={() => <img src={Icon} alt="Icon" className="h-6 w-6 mr-4" />}
      />
      <Drawer.Items>
        {/* CONTENT */}
        {DrawerProps.value.form}
      </Drawer.Items>
    </Drawer>
  );
}
