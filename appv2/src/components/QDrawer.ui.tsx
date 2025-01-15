import { Drawer } from "flowbite-react";
import { signal } from "@preact/signals";
import { type ComponentType } from "preact";

export const DrawerProps = signal({
  title: "Default title",
  state: false,
  form: null as ComponentType | null,
});

export const fillDrawer = (FormComponent: ComponentType, title: string) => {
  DrawerProps.value = {
    title,
    state: true,
    form: FormComponent,
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
  const FormComponent = DrawerProps.value.form;
  return (
    <Drawer
      open={DrawerProps.value.state}
      onClose={closeDrawer}
      backdrop={false}
      position="right"
      className="w-full max-w-md sm:w-[480px]"
    >
      <Drawer.Header title={DrawerProps.value.title} />
      <Drawer.Items>{FormComponent && <FormComponent />}</Drawer.Items>
    </Drawer>
  );
}
