import { AddItem } from "@/components/Common/Item/AddItem";
import formAddList from "@/config/forms/addList.json";
import type { Fields, ListType } from "@/types/types";

type PropsType = {
  ListSize?: number;
  onAddList: (list: ListType) => void;
};

const AddList = (props: PropsType) => {
  const handleAddList = (values: Record<string, unknown>) => {
    if (!values) return;
    props.onAddList({ ...values } as ListType);
  };

  const label = props.ListSize === 0 ? "Crea una lista" : "Añade otra lista";

  return (
    <div className="w-64 flex-none">
      <AddItem
        name="title"
        className="w-full mt-2"
        form={formAddList as Fields[]}
        label={label}
        onAddItem={handleAddList}
        accept="Add List"
        cancel="Cancel"
      />
    </div>
  );
};

export default AddList;
