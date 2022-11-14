import { Button, Input, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Information.module.css";
import { 
  useAddInformationMutation,
  useEditInformationMutation
} from "../../services/Information";

function Editor({ details, type, update, setUpdate, closeEditor } : any) {
  const [description, setDescription] = useState(details?.description);
  const [title, setTitle] = useState(details?.title);

  const [addInformation] = useAddInformationMutation();
  const [editInformation] = useEditInformationMutation();

  const handleEditor = (content:any) => {
    setDescription(content);
  };

  const add = () => {
    if (type == "add") {
      addInformation({
        title: title,
        description: description,
        type: "",
      }).then(() => {
        message.success(`Information Created successfully`);
        setUpdate(!update);
        closeEditor();
      });
    } else {
      const id = details.id;
      const data = { title: title, description: description, id: id };
      editInformation({ id, data }).then(() => {
        message.success(`Information Updated successfully`);
        setUpdate(!update);
        closeEditor();
      });
    }
  };
  return (
    <div className={styles.editor_main_wrapper}>
      <div className={styles.editor_main_container}>
        <div className={styles.label}>Title</div>
        <Input
          className={styles.input}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className={styles.label}>Description</div>
        <ReactQuill
          value={description}
          theme={"snow"}
          onChange={handleEditor}
        />
      </div>

      <Button type="primary" className={styles.savebtn} onClick={add}>
        Save
      </Button>
    </div>
  );
}

export default Editor;
